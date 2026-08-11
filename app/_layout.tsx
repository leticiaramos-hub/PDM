import { Ionicons } from "@expo/vector-icons";
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
        name="(tabs)"
        options={{
          title: "Williane Nails",
          headerLeft: () => (
            <Ionicons 
              name="sparkles-outline" 
              size={20} 
              color="#185fa5" 
              style={{ marginRight: 5 }}
            />
          ),
          headerRight: () => (
            <>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#1a3a5c"
                style={{ marginRight: 10 }}
              />
              <Ionicons
                name="person-outline"
                size={20}
                color="#1a3a5c"
              />
            </>
          ),
        }}
      />
    </Stack>
  );
}