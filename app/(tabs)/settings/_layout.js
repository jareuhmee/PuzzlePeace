import { Stack, useGlobalSearchParams } from "expo-router";
import Colors from "../../../constants/Colors";

export default function SettingsLayout() {
  const { child } = useGlobalSearchParams();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            fontFamily: "DMSans",
            color: Colors.primary,
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="[child]"
        options={{
          title: `${child}'s Settings`,
          headerLargeTitle: true,
          headerShadowVisible: false,

          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            fontFamily: "DMSans",
            color: Colors.primary,
            fontSize: 18,
          },
        }}
      />
    </Stack>
  );
}
