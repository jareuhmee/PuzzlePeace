import { StyleSheet, TextInput, View } from "react-native";
import { defaultStyles } from "../../constants/Styles";

export default function NewEntry() {
  return (
    <View style={defaultStyles.container}>
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
  input: {
    marginVertical: 4,
    width: 300,
    height: 200,
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
  },
});
