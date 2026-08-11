//perfil cliente
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

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

  const historico = [

    {
      servico: "Alongamento Fibra",
      data: "12/06/2026",
    },

    {
      servico: "Manutenção",
      data: "28/05/2026",
    },

  ];

  function salvarTelefone() {

    setCliente({ ...cliente, telefone: telefoneTemp });

    setEditandoTelefone(false);
  }

  function sair() {

    router.replace("/login");
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.titulo}>
        Meu Perfil
      </Text>

      <View style={styles.cardPerfil}>

        <View style={styles.iconePerfil}>

          <Text style={styles.letraPerfil}>
            {cliente.nome_completo.charAt(0).toUpperCase()}
          </Text>

        </View>

        <Text style={styles.nome}>
          {cliente.nome_completo}
        </Text>

        <Text style={styles.email}>
          {cliente.email}
        </Text>

      </View>

      <View style={styles.cardInfo}>

        <View style={styles.linha}>

          <Ionicons
            name="mail-outline"
            size={20}
            color="#27304D"
          />

          <Text style={styles.textoInfo}>
            {cliente.email}
          </Text>

        </View>

        <View style={styles.linha}>

          <Ionicons
            name="call-outline"
            size={20}
            color="#27304D"
          />

          {!editandoTelefone ? (

            <TouchableOpacity
              onPress={() =>
                setEditandoTelefone(true)
              }
            >

              <Text style={styles.textoInfo}>

                {cliente.telefone
                  ? cliente.telefone
                  : "Adicionar telefone"}

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

                <Text style={styles.textoSalvar}>
                  Salvar
                </Text>

              </TouchableOpacity>

            </View>

          )}

        </View>

      </View>

      <Text style={styles.subtitulo}>
        Histórico de Agendamentos
      </Text>

      {historico.map((item, index) => (

        <View
          key={index}
          style={styles.cardHistorico}
        >

          <Ionicons
            name="calendar-outline"
            size={22}
            color="#27304D"
          />

          <View>

            <Text style={styles.servico}>
              {item.servico}
            </Text>

            <Text style={styles.data}>
              {item.data}
            </Text>

          </View>

        </View>

      ))}

      <TouchableOpacity style={styles.botaoSenha}>

        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#27304D"
        />

        <Text style={styles.textoBotaoSenha}>
          Alterar senha
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSair}
        onPress={sair}
      >

        <Text style={styles.textoSair}>
          Sair
        </Text>

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