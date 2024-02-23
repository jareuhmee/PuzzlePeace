import { router } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { defaultStyles } from "../../constants/Styles.js";

export default function ChildAdd() {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Child Add</Text>
      <View style={defaultStyles.separator} />

      <TouchableOpacity
        style={defaultStyles.btn}
        onPress={() => router.replace("/(auth)/child-select")}
      >
        <Text style={defaultStyles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
