import { onAuthStateChanged } from "@firebase/auth";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.js";
import Colors from "../constants/Colors.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";

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
    DMSansExtraBold: require("../assets/fonts/DMSans-ExtraBold.ttf"),
    DMSansItalic: require("../assets/fonts/DMSans-SemiBoldItalic.ttf"),
    DMMonoItalic: require("../assets/fonts/DMMono-Italic.ttf"),
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
        while (router.canGoBack()) router.back();
        router.replace("/(auth)/child-select");
      } else {
        console.log("User logged out.");
        while (router.canGoBack()) router.back();
        router.replace("/");
      }
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Landing Page",
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="(auth)/login"
            options={{
              title: "",
              presentation: "modal",
              headerShown: true,
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }}
                  style={{
                    borderRadius: 20,
                    borderWidth: 1,
                    padding: 4,
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                  }}
                >
                  <Ionicons name="close-outline" size={22} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(auth)/register"
            options={{
              title: "",
              presentation: "modal",
              headerShown: true,
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }}
                  style={{
                    borderRadius: 20,
                    borderWidth: 1,
                    padding: 4,
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                  }}
                >
                  <Ionicons name="close-outline" size={22} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(auth)/pw-reset"
            options={{
              title: "",
              presentation: "modal",
              headerShown: true,
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }}
                  style={{
                    borderRadius: 20,
                    borderWidth: 1,
                    padding: 4,
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                  }}
                >
                  <Ionicons name="close-outline" size={22} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(auth)/child-select"
            options={{
              headerShown: false,
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="(auth)/child-add"
            options={{
              // headerShown: false,
              title: "",
              presentation: "card",
              headerBackTitle: "Back",
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              title: "",
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="(modals)/[entry]"
            options={{
              title: "",
              presentation: "modal",
              headerShown: true,
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }}
                  style={{
                    borderRadius: 20,
                    borderWidth: 1,
                    padding: 4,
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                  }}
                >
                  <Ionicons name="close-outline" size={22} />
                </TouchableOpacity>
              ),
              // headerStyle: {
              //   backgroundColor: Colors.background,
              // },
              // headerTitleStyle: {
              //   fontFamily: "DMSans",
              //   fontSize: 20,
              // },
            }}
          />
          <Stack.Screen
            name="(customize)/[child]/customize"
            // options={{
            //   title: "Customize",
            //   presentation: "card",
            //   headerBackTitle: "Back",
            //   headerTransparent: true,
            // }}
            options={{
              title: "Customize",
              presentation: "card",
              headerBackTitle: "Back",
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="(customize)/[child]/add-triggers"
            options={{
              title: "Add Triggers",
              presentation: "card",
              headerBackTitle: "Back",
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="(customize)/[child]/add-behaviors"
            options={{
              title: "Add Behaviors",
              presentation: "card",
              headerBackTitle: "Back",
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="(customize)/[child]/add-resolutions"
            options={{
              title: "Add Resolutions",
              presentation: "card",
              headerBackTitle: "Back",
              headerTransparent: true,
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
