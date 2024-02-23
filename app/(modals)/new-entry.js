import { StyleSheet, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";

export default function NewEntry() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Add note..."
      />
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
  input: {
    marginVertical: 4,
    width: 300,
    height: 200,
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontFamily: "DMSans",
  },
});
