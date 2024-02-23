import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebase/firebase.js";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors.js";

export default function Home() {
  return (
    <>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Reports</Text> */}
        <View style={styles.separator} />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.navigate("/(modals)/new-entry")}
        >
          <FontAwesome name="pencil-square-o" size={50} color="black" />
          <Text style={styles.label}>New Entry</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  buttonContainer: {
    alignItems: "flex-end",
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontFamily: "DMSans",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "80%",
  },
  button: {
    alignItems: "flex-end",
    backgroundColor: Colors.background,
  },
  label: {
    fontSize: 12,
    fontFamily: "DMSans",
  },
});
