import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    DMSans: require('../assets/fonts/DMSans-SemiBold.ttf'),
    DMMono: require('../assets/fonts/DMMono-Regular.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) 
      throw error;
  }, [error]);

  useEffect(() => {
    if (loaded)
      SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded)
    return null;

  return (
    <RootLayoutNav />
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" 
        options={{
          title: "Landing Page",
          headerShown: false
        }} />
      <Stack.Screen name="(modals)/login" 
        options={{ 
          presentation: 'modal', 
          headerShown: false
        }} />
      <Stack.Screen name="(modals)/register" 
        options={{ 
          presentation: 'modal', 
          headerShown: false
        }} />
      <Stack.Screen name="(tabs)" 
        options={{
          headerShown: false
        }} />
    </Stack>
  );
}