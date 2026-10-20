import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
<<<<<<< HEAD:app/(tabs)/_layout.tsx
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="servico"
        options={{
          title: "Agenda",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
=======
            <Tabs.Screen 
                name="servico" 
                options={{ 
                    title: "Agenda",
                    href: null,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'calendar' : 'calendar-outline'} 
                            size={size} 
                            color={color} 
                        />
                    ),                    
                    headerShown: false
                }} 
>>>>>>> 66b3337a201c255a29dd1460fc0179479721837d:app/tabs/_layout.tsx
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
