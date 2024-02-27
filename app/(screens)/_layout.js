import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.primary },
        tabBarActiveTintColor: Colors.tint,
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: {
          fontFamily: "DMSans",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerStyle: {
            height: 120,
          },
          headerTitleStyle: {
            fontFamily: "DMSans",
            fontSize: 24,
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
          headerStyle: {
            height: 120,
          },
          headerTitleStyle: {
            fontFamily: "DMSans",
            fontSize: 24,
          },
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          headerStyle: {
            height: 120,
          },
          headerTitleStyle: {
            fontFamily: "DMSans",
            fontSize: 24,
          },
          headerTransparent: true,
        }}
      />
    </Tabs>
  );
}
