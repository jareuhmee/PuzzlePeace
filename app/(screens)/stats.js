import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function Stats() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Stats</Text> */}
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
    fontSize: 20,
    fontFamily: "DMSans",
  },
});
