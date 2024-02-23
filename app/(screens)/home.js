import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { defaultStyles } from "../../constants/Styles.js";
import Colors from "../../constants/Colors.js";

export default function Home() {
  return (
    <>
      <View style={defaultStyles.container}>
        {/* <Text style={defaultStyles.title}>Reports</Text> */}
        <View style={defaultStyles.separator} />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.navigate("/(modals)/new-entry")}
        >
          <FontAwesome name="pencil-square-o" size={50} color="black" />
          <Text style={styles.label}>New Entry</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "flex-end",
    padding: 20,
    backgroundColor: Colors.background,
  },
  btn: {
    alignItems: "flex-end",
    backgroundColor: Colors.background,
  },
  label: {
    fontSize: 12,
    fontFamily: "DMSans",
  },
});
