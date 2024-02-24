import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { defaultStyles } from "../../constants/Styles.js";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors.js";

export default function AddTriggers() {
  return (
    <>
      <View style={defaultStyles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.navigate("/(modals)/create-trigger")}
        >
          <Ionicons name="add-circle" size={60} color="black" />
          <Text style={styles.label}>Create New</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  label: {
    fontSize: 12,
    fontFamily: "DMSans",
  },
});
