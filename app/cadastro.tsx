//cadastro cliente
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

function identificarCadastro() {
  if (!nome.trim() || !email.trim() || !senha.trim()) {
    Alert.alert("Atenção", "Preencha todos os campos.");
    return;
  }
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    Alert.alert("Atenção", "Digite um e-mail válido.");
    return;
  }
  if (senha.length < 6) {
    Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
    return;
  }
  router.push({
    pathname: "/home",
    params: { nome, email },
  });
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

        <Text style={styles.titulo}>Criar uma conta</Text>
        <Text style={styles.subtitulo}>
          Insira seu e-mail para se cadastrar no aplicativo
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />
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

        <TouchableOpacity
          style={styles.botao}
          onPress={identificarCadastro}

        >
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>

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
    backgroundColor: "#1a2e4a",
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