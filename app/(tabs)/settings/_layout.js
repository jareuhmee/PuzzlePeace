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
          },
        }}
      />
      <Stack.Screen
        name="[child]"
        options={{
          title: "",
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
    </Stack>
  );
}
