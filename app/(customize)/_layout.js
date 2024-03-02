import { Stack } from "expo-router";

export default function CustomizeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="customize"
        options={{
          title: "Customize",
          presentation: "card",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="add-triggers"
        options={{
          title: "Add Triggers",
          presentation: "card",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="add-behaviors"
        options={{
          title: "Add Behaviors",
          presentation: "card",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="add-resolutions"
        options={{
          title: "Add Resolutions",
          presentation: "card",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
