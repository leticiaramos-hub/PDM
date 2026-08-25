import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SERVICOS = [
  {
    id: "manutencao",
    nome: "Manutenção",
    desc: "Retoques em unhas já feitas",
    valor: "R$ 80,00",
    subOpcoes: null,
  },
  {
    id: "alongamento",
    nome: "Alongamento",
    desc: "Aplicação das unhas",
    valor: null,
    subOpcoes: [
      { id: "fibra", nome: "Fibra de Vidro", valor: "R$ 130,00" },
      { id: "tip", nome: "Tip", valor: "R$ 130,00" },
    ],
  },
  {
    id: "esmaltacao",
    nome: "Esmaltação",
    desc: "Esmalte em gel com secagem UV",
    valor: "R$ 40,00",
    subOpcoes: null,
  },
];

const PAGAMENTOS = [
  { id: "pix", nome: "Pix", icone: "qr-code-outline" },
  { id: "cartao", nome: "Cartão", icone: "card-outline" },
  { id: "dinheiro", nome: "Dinheiro", icone: "cash-outline" },
];

export default function EscolhaServico() {
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [subSelecionado, setSubSelecionado] = useState<string | null>(null);
  const [pagamento, setPagamento] = useState<string | null>(null);

  function avancar() {
    if (!selecionado) {
      Alert.alert("Atenção", "Selecione um serviço para continuar.");
      return;
    }

    const servico = SERVICOS.find((s) => s.id === selecionado);

    if (servico?.subOpcoes && !subSelecionado) {
      Alert.alert("Atenção", "Selecione o tipo de alongamento.");
      return;
    }

    if (!pagamento) {
      Alert.alert("Atenção", "Selecione uma forma de pagamento.");
      return;
    }

    let nomeServico = servico?.nome || "";

    if (servico?.subOpcoes) {
      const sub = servico.subOpcoes.find((s) => s.id === subSelecionado);
      nomeServico = `${servico.nome} - ${sub?.nome}`;
    }

    const nomePagamento = PAGAMENTOS.find((p) => p.id === pagamento)?.nome || "";

    router.push({
      pathname: "/dt-hr",
      params: {
        servico: nomeServico,
        pagamento: nomePagamento,
      },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a6b" />

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
              <View key={servico.id}>
                <Pressable
                  style={[styles.card, ativo && styles.cardSelecionado]}
                  onPress={() => {
                    setSelecionado(servico.id);
                    setSubSelecionado(null);
                  }}
                >
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardNome}>{servico.nome}</Text>
                    <Text style={styles.cardDesc}>{servico.desc}</Text>
                  </View>

                  {!servico.subOpcoes ? (
                    <View style={[styles.valorBadge, ativo && styles.valorBadgeAtivo]}>
                      <Text style={[styles.valorTexto, ativo && styles.valorTextoAtivo]}>
                        {servico.valor}
                      </Text>
                    </View>
                  ) : (
                    <Ionicons
                      name={ativo ? "chevron-up" : "chevron-down"}
                      size={18}
                      color="#2255a4"
                    />
                  )}
                </Pressable>

                {ativo && servico.subOpcoes && (
                  <View style={styles.subArea}>
                    {servico.subOpcoes.map((sub) => {
                      const subAtivo = subSelecionado === sub.id;
                      return (
                        <Pressable
                          key={sub.id}
                          style={[styles.subCard, subAtivo && styles.subCardAtivo]}
                          onPress={() => setSubSelecionado(sub.id)}
                        >
                          <Text style={[styles.subNome, subAtivo && styles.subNomeAtivo]}>
                            {sub.nome}
                          </Text>
                          <View style={[styles.valorBadge, subAtivo && styles.valorBadgeAtivo]}>
                            <Text style={[styles.valorTexto, subAtivo && styles.valorTextoAtivo]}>
                              {sub.valor}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* SEÇÃO DE PAGAMENTO */}
        <Text style={styles.pagamentoTitulo}>Forma de Pagamento</Text>
        <Text style={styles.pagamentoSubtitulo}>Como prefere pagar?</Text>

        <View style={styles.pagamentoArea}>
          {PAGAMENTOS.map((p) => {
            const ativo = pagamento === p.id;
            return (
              <Pressable
                key={p.id}
                style={[styles.pagamentoCard, ativo && styles.pagamentoCardAtivo]}
                onPress={() => setPagamento(p.id)}
              >
                <Ionicons
                  name={p.icone as any}
                  size={22}
                  color={ativo ? "#fff" : "#2255a4"}
                />
                <Text style={[styles.pagamentoNome, ativo && styles.pagamentoNomeAtivo]}>
                  {p.nome}
                </Text>
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
          onPress={avancar}
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
    backgroundColor: "#fff",
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

  subArea: {
    marginTop: 6,
    gap: 8,
    paddingLeft: 12,
  },

  subCard: {
    backgroundColor: "#f0f4ff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: "#d0daf0",
  },

  subCardAtivo: {
    borderWidth: 2,
    borderColor: "#2255a4",
    backgroundColor: "#e6edff",
  },

  subNome: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a2f5e",
  },

  subNomeAtivo: {
    color: "#2255a4",
  },

  pagamentoTitulo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a3a5c",
    marginTop: 24,
    marginBottom: 4,
  },

  pagamentoSubtitulo: {
    fontSize: 13,
    color: "#1a3a5c",
    marginBottom: 14,
  },

  pagamentoArea: {
    flexDirection: "row",
    gap: 10,
  },

  pagamentoCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    gap: 6,
    borderWidth: 2,
    borderColor: "transparent",
  },

  pagamentoCardAtivo: {
    backgroundColor: "#2255a4",
    borderColor: "#2255a4",
  },

  pagamentoNome: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2255a4",
  },

  pagamentoNomeAtivo: {
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