import { Stack } from "expo-router";
import Colors from "../../../constants/Colors";

export default function SettingsLayout() {
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
          title: "Child Settings",
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
