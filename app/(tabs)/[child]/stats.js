import { Text, View } from "react-native";
import { defaultStyles } from "../../../constants/Styles";
import { useGlobalSearchParams } from "expo-router";

export default function Stats() {
  const { child } = useGlobalSearchParams();
  return (
    <View style={defaultStyles.container}>
      <Text>{child}</Text>
      {/* <Text style={defaultStyles.title}>Stats</Text> */}
    </View>
  );
}
