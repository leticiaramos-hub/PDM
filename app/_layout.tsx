import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="cadastro"
        options={{
          title: "Cadastro",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Início",
          headerShown: false
        }}
      />
      
      <Stack.Screen
        name="meus-agendamentos"
        options={{
          title: "Meus Agendamentos",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="confirmacao"
        options={{
          title: "Confirmação",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="servico"
        options={{
          title: "Serviço",
          headerShown: false
        }}
      />

        <Stack.Screen
        name="dt-hr"
        options={{
          title: "Data e Hora",
          headerShown: false
        }}
      />

        <Stack.Screen 
        name="perfil" 
        options={{ 
          headerShown: false
        }} 
      />

              <Stack.Screen 
        name="dadosUsuarios" 
        options={{ 
          headerShown: false
        }} 
      />

    </Stack>
  );
}