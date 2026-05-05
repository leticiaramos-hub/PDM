import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function identificarLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }
    Alert.alert("Bem-vinda!", "Login realizado com sucesso.");
    //navigation.replace("home");
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#c8d8ee",
      padding: 24,
    }}>

     // parte de cima, somente a logo e o nome do projeto
      <View style={{
        flex: 0.1,                  
        alignItems: "center",
        justifyContent: "center", 
      }}>
        <Image
          source={require("../img/pessoa.png")}
          style={{width: 60, 
                height: 60, 
                marginBottom: 5 
            }}/>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../img/logo.png")}
            style={{ width: 50, 
                    height: 50, 
                    marginRight: 1        
            }}/>
          <Text style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#001F5C",
            marginLeft: -50
          }}>Williane Nails</Text>
        </View>
      </View>

      // parte do email e senha, somente eles
      <View style={{
        flex: 1,                  
        justifyContent: "center", 
      }}>
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#a9a9a9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            width: "100%",
            borderWidth: 1.5,
            borderColor: "transparent",
            borderRadius: 12,
            padding: 14,
            marginBottom: 20,
            fontSize: 15,
            backgroundColor: "#fff"
          }}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#a9a9a9"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={{
            width: "100%",
            borderWidth: 1.5,
            borderColor: "transparent",
            borderRadius: 12,
            padding: 14,
            marginBottom: 24,
            fontSize: 15,
            backgroundColor: "#fff"
          }}
        />

        <Pressable
          onPress={identificarLogin}
          style={({ pressed }) => ({
            width: "100%",
            backgroundColor: pressed ? "#a9a9a9" : "#000000",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            marginBottom: 16,
          })}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Login</Text>
        </Pressable>

        {/* Link para cadastro */}
        <Pressable onPress={() => { /* navigation.navigate("cadastro") */ }}>
          <Text style={{ color: "#001F5C", fontSize: 14, textAlign: "center" }}>
            Não tem conta?{" "}
            <Text style={{ fontWeight: "bold" }}>Cadastre-se</Text>
          </Text>
        </Pressable>
      </View>

    </View>
  );
}