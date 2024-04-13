import { Stack, useGlobalSearchParams } from "expo-router";
import Colors from "../../../../constants/Colors";

export default function HomeLayout() {
  const { child } = useGlobalSearchParams();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
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
      <Stack.Screen
        name="new-entry"
        options={{
          title: "New Entry",
          presentation: "card",
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
