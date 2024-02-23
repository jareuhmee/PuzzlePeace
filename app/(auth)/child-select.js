import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebase/firebase.js";
import Colors from "../../constants/Colors.js";

export default function ChildSelect() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Select</Text>
      <View style={styles.separator} />

      <Pressable
        style={styles.button}
        onPress={() => router.replace("/(screens)/home")}
      >
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 36,
    fontFamily: "DMSans",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    height: 50,
    width: 200,
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    backgroundColor: Colors.primary,
    borderColor: "white",
  },
  text: {
    fontSize: 16,
    fontFamily: "DMSans",
  },
});
