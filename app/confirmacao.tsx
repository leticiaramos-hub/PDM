import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

function gerarIdAgendamento(): string {
  const numero = Math.floor(1000 + Math.random() * 9000);

  return `#NAILS${numero}`;
}

function formatarData(dataStr: string): string {
  if (!dataStr) return "";

  const [ano, mes, dia] = dataStr
    .split("-")
    .map(Number);

  const data = new Date(ano, mes - 1, dia);

  const diasSemana = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  return `${diasSemana[data.getDay()]}, ${dia} de ${meses[mes - 1]} de ${ano}`;
}

export default function Confirmacao() {
  const rota = useRouter();

  const params = useLocalSearchParams();

  const data = (params.data as string) ?? "";
  const horario = (params.horario as string) ?? "";

  const servico =
    (params.servico as string) ??
    "Serviço não informado";

  const pagamento =
    (params.pagamento as string) ??
    "Não informado";

  const [idAgendamento] =
    useState(gerarIdAgendamento);

  const dataFormatada = formatarData(data);

  const local =
    "Rua Cícero Tomé de Araújo, 122 - Pocinhos, PB";

  async function compartilhar() {
    try {
      await Share.share({
        message:
          `Agendamento Williane Nails\n\n` +
          `ID: ${idAgendamento}\n` +
          `Data: ${dataFormatada} às ${horario}\n` +
          `Serviço: ${servico}\n` +
          `Pagamento: ${pagamento}\n` +
          `Local: ${local}`,
      });
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível compartilhar."
      );
    }
  }

  function ItemInfo(
    icone: any,
    titulo: string,
    valor: string
  ) {
    return (
      <View style={styles.cardLinha}>
        <View style={styles.cardIcone}>
          <Ionicons
            name={icone}
            size={18}
            color="#7B84A6"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardItemLabel}>
            {titulo}
          </Text>

          <Text style={styles.cardItemValor}>
            {valor}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitulo}>
        Confirmação
      </Text>

      <View style={styles.etapas}>
        <View style={styles.etapaPonto} />
        <View style={styles.etapaPonto} />
        <View style={styles.etapaPonto} />
        <View style={styles.etapaAtiva} />
      </View>

      <View style={styles.iconeContainer}>
        <View style={styles.iconeCirculo}>
          <Ionicons
            name="checkmark"
            size={32}
            color="#9b6b6e"
          />
        </View>
      </View>

      <Text style={styles.titulo}>
        Agendamento Confirmado!
      </Text>

      <Text style={styles.subtitulo}>
        Seu horário foi reservado com sucesso
      </Text>

      <View style={styles.statusBadge}>
        <Text style={styles.statusTexto}>
          Aguardando confirmação da proprietária
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          ID DO AGENDAMENTO
        </Text>

        <Text style={styles.cardId}>
          {idAgendamento}
        </Text>

        <View style={styles.divisor} />

        {ItemInfo(
          "calendar-outline",
          "Data & Hora",
          `${dataFormatada} às ${horario}`
        )}

        {ItemInfo(
          "sparkles-outline",
          "Serviço",
          servico
        )}

        {ItemInfo(
          "card-outline",
          "Pagamento",
          pagamento
        )}

        {ItemInfo(
          "location-outline",
          "Local",
          local
        )}
      </View>

      <Text style={styles.avisoTexto}>
        Você receberá confirmação do
        agendamento
      </Text>

      <TouchableOpacity
        style={styles.botaoPrimario}
        onPress={() => rota.push("/home" as any)}
      >
        <Text style={styles.botaoPrimarioTexto}>
          Voltar ao Início
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={compartilhar}
      >
        <Text style={styles.botaoSecundarioTexto}>
          Compartilhar Agendamento
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

  headerTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27304D",
    marginTop: 40,
    marginBottom: 16,
  },

  etapas: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 28,
  },

  etapaPonto: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#b0bcd4",
  },

  etapaAtiva: {
    width: 28,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#27304D",
  },

  iconeContainer: {
    alignItems: "center",
    marginBottom: 16,
  },

  iconeCirculo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e8c8cc",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#27304D",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 14,
    color: "#6b7a99",
    textAlign: "center",
    marginBottom: 16,
  },

  statusBadge: {
    backgroundColor: "#fff3cd",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: "center",
    marginBottom: 20,
  },

  statusTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: "#27304D",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },

  cardLabel: {
    fontSize: 11,
    color: "#8898b0",
    fontWeight: "600",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 6,
  },

  cardId: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27304D",
    textAlign: "center",
    marginBottom: 16,
  },

  divisor: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 16,
  },

  cardLinha: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
  },

  cardIcone: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f0f3fa",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  cardItemLabel: {
    fontSize: 11,
    color: "#8898b0",
    fontWeight: "500",
    marginBottom: 2,
  },

  cardItemValor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#27304D",
  },

  avisoTexto: {
    textAlign: "center",
    fontSize: 12,
    color: "#8898b0",
    marginBottom: 20,
  },

  botaoPrimario: {
    backgroundColor: "#27304D",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 12,
  },

  botaoPrimarioTexto: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  botaoSecundario: {
    backgroundColor: "transparent",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#27304D",
  },

  botaoSecundarioTexto: {
    color: "#27304D",
    fontWeight: "bold",
    fontSize: 16,
  },
});