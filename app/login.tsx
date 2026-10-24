import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usuario } from "../util/usuario";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const APIKEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function identificarLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }

    try {
      const response = await fetch(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            apikey: APIKEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password: senha }),
        },
      );

      const data = await response.json();
      console.log("Resposta do login:", data);

      if (!response.ok) {
        if (data.error_code === "email_not_confirmed") {
          Alert.alert("Atenção", "Confirme seu e-mail antes de entrar.");
        } else {
          Alert.alert("Erro", "E-mail ou senha incorretos.");
        }
        return;
      }

      const nome = data.user?.user_metadata?.nome;
      usuario.nome = nome;
      usuario.email = data.user.email;
      usuario.id = data.user.id;

      router.replace({
        pathname: "/tabs",
        params: { nome, email: data.user.email },
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#a8c0e0" />

      <View style={styles.container}>
        <View style={styles.iconeTopo}>
          <Ionicons name="person-outline" size={32} color="#1a3a5c" />
        </View>

        <View style={styles.logoRow}>
          <Ionicons name="sparkles-outline" size={20} color="#185fa5" />
          <Text style={styles.logoText}>Williane Nails</Text>
        </View>

        <Text style={styles.titulo}>Bem-vinda de volta!</Text>
        <Text style={styles.subtitulo}>
          Insira seus dados para acessar o aplicativo
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            { backgroundColor: pressed ? "#a9a9a9" : "#1a2e4a" },
          ]}
          onPress={identificarLogin}
        >
          <Text style={styles.botaoTexto}>Login</Text>
        </Pressable>

        <Pressable onPress={() => router.navigate("/cadastro")}>
          <Text style={{ color: "#001F5C", fontSize: 14, textAlign: "center" }}>
            Não tem conta?{" "}
            <Text style={{ fontWeight: "bold" }}>Cadastre-se</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#a8c0e0",
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#a8c0e0",
  },
  iconeTopo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#1a3a5c",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a3a5c",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a2e4a",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 13,
    color: "#1a3a5c",
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#1a2e4a",
  },
  botao: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
