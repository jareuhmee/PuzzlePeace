import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          headerShown: false
        }} 
      />
      <Tabs.Screen
        name="analyze" 
        options={{
          title: "Analyze",
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
