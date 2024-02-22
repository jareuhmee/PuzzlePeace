import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarStyle: { backgroundColor: '#ffffff' },
      tabBarActiveTintColor: '#76A4B0',
      tabBarInactiveTintColor: 'black',
      tabBarLabelStyle: {
        fontFamily: 'DMMono',
        fontSize: 12
      }
    }}>
      <Tabs.Screen
        name="stats" 
        options={{
          title: 'Stats',
          headerStyle: {
            height: 120
          },
          headerTitleStyle: {
            fontFamily: 'DMSans',
            fontSize: 24
          },
          headerTransparent: true
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Reports',
          headerStyle: {
            height: 120
          },
          headerTitleStyle: {
            fontFamily: 'DMSans',
            fontSize: 24
          },
          
          headerTransparent: true
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerStyle: {
            height: 120
          },
          headerTitleStyle: {
            fontFamily: 'DMSans',
            fontSize: 24
          },
          headerTransparent: true
        }}
      />
    </Tabs>
  );
}
