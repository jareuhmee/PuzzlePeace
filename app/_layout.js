import { onAuthStateChanged } from "@firebase/auth";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.js";
import Colors from "../constants/Colors.js";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    DMSans: require("../assets/fonts/DMSans-SemiBold.ttf"),
    DMMono: require("../assets/fonts/DMMono-Regular.ttf"),
    DMSansExtraBold: require("../assets/fonts/DMSans-ExtraBold.ttf")
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        console.log(user.email, "logged in.");
        router.replace("/(auth)/child-select");
      } else {
        console.log("User logged out.");
        router.navigate("/");
      }
    });
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Landing Page",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/login"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/register"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/child-select"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/child-add"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(screens)"
        options={{
          headerShown: false,
          title: "",
        }}
      />
      <Stack.Screen
        name="(modals)/new-entry"
        options={{
          title: "New Report",
          presentation: "formSheet",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            fontFamily: "DMSans",
            fontSize: 20,
          },
        }}
      />
    </Stack>
  );
}
