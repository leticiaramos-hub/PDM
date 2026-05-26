import { useState } from "react";
import { Alert, Pressable, Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SERVICOS = [
  { id: "manutencao", nome: "Manutenção", desc: "Retoques em unhas já feitas" },
  { id: "alongamento", nome: "Alongamento", desc: "Aplicação das unhas" },
  { id: "esmaltacao", nome: "Esmaltação", desc: "Esmalte em gel com secagem UV" },
  
];

export default function EscolhaServico() {
  const [selecionado, setSelecionado] = useState<string | null>(null);

  function avancar() {
    if (!selecionado) {
      Alert.alert("Atenção", "Selecione um serviço para continuar.");
      return;
    }
    router.push("/agendar/horario");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a6b" />

      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1a3a5c" />
        </Pressable>
        <Text style={styles.topTitle}>Agendar Horário</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.accentBar} />
        <Text style={styles.titulo}>Escolha o Serviço</Text>
        <Text style={styles.subtitulo}>Qual tipo de manicure deseja?</Text>

        <View style={styles.cardsArea}>
          {SERVICOS.map((servico) => {
            const ativo = selecionado === servico.id;
            return (
              <Pressable
                key={servico.id}
                style={[styles.card, ativo && styles.cardSelecionado]}
                onPress={() => setSelecionado(servico.id)}
              >
                <View style={styles.cardInfo}>
                  <Text style={styles.cardNome}>{servico.nome}</Text>
                  <Text style={styles.cardDesc}>{servico.desc}</Text>
                </View>
                <View style={[styles.valorBadge, ativo && styles.valorBadgeAtivo]}>
                  <Text style={[styles.valorTexto, ativo && styles.valorTextoAtivo]}>
                    Valor
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottomArea}>
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            { backgroundColor: pressed ? "#0f2550" : "#1a3a6b" },
          ]}
          onPress={() => router.push("/dt-hr")}
        >
          <Text style={styles.botaoTexto}>Próximo</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#c8d8ee",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 4,
    backgroundColor: "#fff"
  },
  backBtn: {
    padding: 4,
  },
  topTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a3a5c",
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  accentBar: {
    width: 32,
    height: 4,
    backgroundColor: "#1a3a5c",
    borderRadius: 3,
    marginTop: 16,
    marginBottom: 8,
    opacity: 0.85,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a3a5c",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: "#1a3a5c",
    marginBottom: 20,
  },
  cardsArea: {
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 14,
  },
  cardSelecionado: {
    borderWidth: 2,
    borderColor: "#2255a4",
  },
  cardInfo: {
    flex: 1,
  },
  cardNome: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a2f5e",
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 12,
    color: "#7a8aab",
  },
  valorBadge: {
    backgroundColor: "#eaf0fb",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  valorBadgeAtivo: {
    backgroundColor: "#2255a4",
  },
  valorTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2255a4",
  },
  valorTextoAtivo: {
    color: "#fff",
  },
  bottomArea: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  botao: {
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});