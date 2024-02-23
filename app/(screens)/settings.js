import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebase/firebase.js";
import Colors from "../../constants/Colors.js";

export default function Settings() {
  return (
    <>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Reports</Text> */}
        <View style={styles.separator} />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => auth.signOut()}>
          <Text style={styles.text}>Logout</Text>
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
    alignItems: "center",
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
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    height: 60,
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
