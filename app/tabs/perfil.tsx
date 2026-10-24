//perfil cliente
import React, { useState, useEffect, useCallback } from "react";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { usuario } from "../../util/usuario";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Perfil = {
  nome_completo: string;
  telefone: string | null;
  email: string;
};

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const APIKEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

const estilosStatus: any = {
  Pendente: { fundo: "#FFF3CD", cor: "#9A6700", icone: "time-outline" },
  Confirmado: {
    fundo: "#DDF4E4",
    cor: "#1E7B3A",
    icone: "checkmark-circle-outline",
  },
  Cancelado: {
    fundo: "#FBE0E0",
    cor: "#B3261E",
    icone: "close-circle-outline",
  },
};

export default function Perfil() {
  const params = useLocalSearchParams();
  const codCliente = params.cod_cliente as string;

  const [cliente, setCliente] = useState<Perfil>({
    nome_completo: "Usuário",
    email: "usuario@email.com",
    telefone: "",
  });
  const [editandoTelefone, setEditandoTelefone] = useState(false);
  const [telefoneTemp, setTelefoneTemp] = useState("");

  useEffect(() => {
    async function buscarTelefone() {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/cadastro?id=eq.${usuario.id}&select=telefone`,
          { headers: { apikey: APIKEY } },
        );
        const data = await response.json();
        if (data[0]?.telefone)
          setCliente((c) => ({ ...c, telefone: data[0].telefone }));
      } catch (error) {
        console.error("Erro ao buscar telefone:", error);
      }
    }
    buscarTelefone();
  }, []);

  const [historico, setHistorico] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function buscarHistorico() {
        try {
          const [resAg, resServ] = await Promise.all([
            fetch(
              `${SUPABASE_URL}/rest/v1/agendamento?cliente_id=eq.${usuario.id}&select=servico_id,data,status&order=data.desc`,
              { headers: { apikey: APIKEY } },
            ),
            fetch(`${SUPABASE_URL}/rest/v1/servico?select=id,nome`, {
              headers: { apikey: APIKEY },
            }),
          ]);
          const agendamentos = await resAg.json();
          const servicos = await resServ.json();
          if (!Array.isArray(agendamentos) || !Array.isArray(servicos)) {
            console.log("Resposta do histórico:", agendamentos);
            return;
          }
          setHistorico(
            agendamentos.map((a: any) => {
              const s = servicos.find((x: any) => x.id === a.servico_id);
              const [ano, mes, dia] = a.data.split("-");
              return {
                servico: s ? s.nome : "Serviço",
                data: `${dia}/${mes}/${ano}`,
                status: a.status,
              };
            }),
          );
        } catch (error) {
          console.error("Erro ao buscar histórico:", error);
        }
      }
      buscarHistorico();
    }, []),
  );

  async function salvarTelefone() {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/cadastro?id=eq.${usuario.id}`,
        {
          method: "PATCH",
          headers: { apikey: APIKEY, "Content-Type": "application/json" },
          body: JSON.stringify({ telefone: telefoneTemp }),
        },
      );
      if (!response.ok) {
        console.error(await response.text());
        return;
      }
      setCliente({ ...cliente, telefone: telefoneTemp });
      setEditandoTelefone(false);
    } catch (error) {
      console.error("Erro ao salvar telefone:", error);
    }
  }

  function sair() {
    router.replace("/login");
  }

  const nome = usuario.nome;
  const email = usuario.email;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Meu Perfil</Text>

      <View style={styles.cardPerfil}>
        <View style={styles.iconePerfil}>
          <Text style={styles.letraPerfil}>{nome?.[0]?.toUpperCase()}</Text>
        </View>

        <Text style={styles.nome}>{nome}</Text>

        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.linha}>
          <Ionicons name="mail-outline" size={20} color="#27304D" />

          <Text style={styles.textoInfo}>{email}</Text>
        </View>

        <View style={styles.linha}>
          <Ionicons name="call-outline" size={20} color="#27304D" />

          {!editandoTelefone ? (
            <TouchableOpacity onPress={() => setEditandoTelefone(true)}>
              <Text style={styles.textoInfo}>
                {cliente.telefone ? cliente.telefone : "Adicionar telefone"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.areaInput}>
              <TextInput
                placeholder="Digite seu telefone"
                value={telefoneTemp}
                onChangeText={setTelefoneTemp}
                style={styles.input}
                keyboardType="phone-pad"
              />

              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarTelefone}
              >
                <Text style={styles.textoSalvar}>Salvar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.subtitulo}>Histórico de Agendamentos</Text>

      {historico.map((item, index) => {
        const rotulo =
          item.status === "Confirmado" || item.status === "Cancelado"
            ? item.status
            : "Pendente";
        const est = estilosStatus[rotulo];
        return (
          <View key={index} style={styles.cardHistorico}>
            <Ionicons name="calendar-outline" size={22} color="#27304D" />
            <View style={{ flex: 1 }}>
              <Text style={styles.servico}>{item.servico}</Text>
              <Text style={styles.data}>{item.data}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                backgroundColor: est.fundo,
                borderRadius: 12,
                paddingVertical: 4,
                paddingHorizontal: 10,
              }}
            >
              <Ionicons name={est.icone} size={12} color={est.cor} />
              <Text style={{ fontSize: 11, fontWeight: "700", color: est.cor }}>
                {rotulo}
              </Text>
            </View>
          </View>
        );
      })}

      <TouchableOpacity style={styles.botaoSair} onPress={sair}>
        <Text style={styles.textoSair}>Sair</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9EDF8",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#27304D",
    marginTop: 40,
    marginBottom: 25,
  },

  cardPerfil: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
  },

  iconePerfil: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7B84A6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  letraPerfil: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
  },

  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#27304D",
    marginBottom: 4,
  },

  email: {
    fontSize: 14,
    color: "#7A86A8",
  },

  cardInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    gap: 16,
  },

  linha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  textoInfo: {
    fontSize: 15,
    color: "#27304D",
    fontWeight: "500",
  },

  areaInput: {
    flex: 1,
  },

  input: {
    backgroundColor: "#F2F5FB",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    color: "#27304D",
  },

  botaoSalvar: {
    backgroundColor: "#7B84A6",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
  },

  textoSalvar: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27304D",
    marginBottom: 14,
  },

  cardHistorico: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
  },

  servico: {
    fontSize: 15,
    fontWeight: "600",
    color: "#27304D",
  },

  data: {
    fontSize: 13,
    color: "#7A86A8",
    marginTop: 2,
  },

  botaoSenha: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    marginBottom: 16,
  },

  textoBotaoSenha: {
    fontSize: 15,
    fontWeight: "600",
    color: "#27304D",
  },

  botaoSair: {
    backgroundColor: "#27304D",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginBottom: 40,
  },

  textoSair: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
