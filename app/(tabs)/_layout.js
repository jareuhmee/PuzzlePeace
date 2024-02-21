import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false
        }} 
      />
      <Tabs.Screen
        name="new-entry"
        options={{
          title: "New Entry",
          headerShown: false
        }} 
      />
      <Tabs.Screen
        name="stats" 
        options={{
          title: "Stats",
          headerShown: false
        }} 
      />
      <Tabs.Screen
        name="settings" 
        options={{
          title: "Settings",
          headerShown: false
        }} 
      />
    </Tabs>
  );
}
