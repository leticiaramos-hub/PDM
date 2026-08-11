const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Cadastro
app.post("/cadastro", async (req, res) => {
  const { nome_completo, email, senha, telefone } = req.body;

  if (!nome_completo || !email || !senha) {
    return res.status(400).json({ erro: "Preencha nome, email e senha." });
  }

  try {
    const senha_hash = await bcrypt.hash(senha, 10);

    const resultado = await pool.query(
      `INSERT INTO cliente (nome_completo, email, senha_hash, telefone)
       VALUES ($1, $2, $3, $4)
       RETURNING cod_cliente, nome_completo, email, telefone`,
      [nome_completo, email, senha_hash, telefone || null]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ erro: "Este e-mail já está cadastrado." });
    }
    console.error(err);
    res.status(500).json({ erro: "Erro ao cadastrar." });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Preencha email e senha." });
  }

  try {
    const resultado = await pool.query(
      `SELECT cod_cliente, nome_completo, email, telefone, senha_hash
       FROM cliente WHERE email = $1`,
      [email]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ erro: "E-mail ou senha inválidos." });
    }

    const cliente = resultado.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, cliente.senha_hash);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "E-mail ou senha inválidos." });
    }

    res.json({
      cod_cliente: cliente.cod_cliente,
      nome_completo: cliente.nome_completo,
      email: cliente.email,
      telefone: cliente.telefone,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao fazer login." });
  }
});

// Buscar dados do perfil
app.get("/cliente/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT cod_cliente, nome_completo, email, telefone FROM cliente WHERE cod_cliente = $1`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Cliente não encontrado." });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar cliente." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});