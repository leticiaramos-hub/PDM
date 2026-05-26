import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function identificarLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }
    router.replace("/home");
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
            { backgroundColor: pressed ? "#a9a9a9" : "#1a2e4a" }
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
    paddingHorizontal: 16,
    paddingVertical: 14,
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