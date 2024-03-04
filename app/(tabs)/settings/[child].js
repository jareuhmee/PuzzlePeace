import { Text, View } from "react-native";
import { defaultStyles } from "../../../constants/Styles";
import { useLocalSearchParams } from "expo-router";

export default function ChildSettings() {
  const { child } = useLocalSearchParams();

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>{child} Settings</Text>
    </View>
  );
}
