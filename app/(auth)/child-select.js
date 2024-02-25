import { router } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { defaultStyles } from "../../constants/Styles.js";

export default function ChildSelect() {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Child Select</Text>
      <View style={defaultStyles.separator} />

      <TouchableOpacity
        style={defaultStyles.btn}
        onPress={() => router.replace("/(screens)/home")}
      >
        <Text style={defaultStyles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
