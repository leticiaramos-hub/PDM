import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StatusBar, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const nome = params.nome as string;
  const email = params.email as string;

  const servicos = [
    { nome: "Alongamento", imagem: require("../../img/alongamento.png") },
    { nome: "Manutenção", imagem: require("../../img/manutencao.png") },
    { nome: "Esmaltação", imagem: require("../../img/esmaltacao.png") },
    { nome: "Banho em Gel", imagem: require("../../img/banho-gel.png") },
    { nome: "Blindagem", imagem: require("../../img/blindagem.png") },
    { nome: "Remoção", imagem: require("../../img/remocao.png") },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#c8d8ee" }}>
      <StatusBar hidden={false} barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: "#1a3a5c",
            }}
          >
            Olá, bem-vinda!
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#1a2e4a",
              marginTop: 2,
            }}
          >
            O que deseja hoje?
          </Text>

          <View
            style={{
              backgroundColor: "#1e4a7c",
              borderRadius: 18,
              padding: 18,
              marginTop: 14,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Marque seu horário!
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#fff",
              }}
            >
              Unhas perfeitas{"\n"}te esperam!
            </Text>

            <Pressable
              style={{
                alignSelf: "flex-end",
                backgroundColor: "#fff",
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 22,
                marginTop: 6,
              }}
              onPress={() => router.push("/servico")}
            >
              <Text
                style={{
                  color: "#1e4a7c",
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                Agendar
              </Text>
            </Pressable>
          </View>

          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: "#1a3a5c",
              marginTop: 14,
            }}
          >
            Nossos Serviços
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            {servicos.map((s) => (
              <Pressable
                key={s.nome}
                style={{
                  width: "48%",
                  backgroundColor: "rgba(255,255,255,0.22)",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.35)",
                  paddingVertical: 16,
                  marginBottom: 12,
                  alignItems: "center",
                }}
                onPress={() => router.push("/servico")}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "rgba(30,74,124,0.15)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={s.imagem}
                    style={{
                      width: 28,
                      height: 28,
                    }}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#1a2e4a",
                    marginTop: 8,
                    textAlign: "center",
                  }}
                >
                  {s.nome}
                </Text>
              </Pressable>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 14,
              marginTop: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Ionicons
                  name="location-outline"
                  size={13}
                  color="#185fa5"
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#185fa5",
                  }}
                >
                  Endereço
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 10.5,
                  color: "#1a3a5c",
                }}
              >
                Rua Cícero Tomé de Araújo, 122{"\n"}
                Nova Brasília – Pocinhos, PB{"\n"}
                CEP: 58150-000
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Ionicons
                  name="call-outline"
                  size={13}
                  color="#185fa5"
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#185fa5",
                  }}
                >
                  Contato
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 10.5,
                  color: "#1a3a5c",
                }}
              >
                (83) 9419-3560{"\n"}
                willianefarias@gmail.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>      
    </View>
  );
}