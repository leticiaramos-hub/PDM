import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default () => {
    return (
        <Tabs>            
            <Tabs.Screen 
                name="home" 
                options={{ 
                    title: "Inicio",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'} 
                            size={size} 
                            color={color} 
                        />
                    ),
                    headerShown: false
                }} 
            />
            <Tabs.Screen 
                name="servico" 
                options={{ 
                    title: "Agenda",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'calendar' : 'calendar-outline'} 
                            size={size} 
                            color={color} 
                        />
                    ),                    
                    headerShown: false
                }} 
            />
            <Tabs.Screen 
                name="perfil" 
                options={{ 
                    title: "Perfil" ,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'} 
                            size={size} 
                            color={color} 
                        />
                    ),
                    headerShown: false
                }} 
            />
        </Tabs>
    );
}