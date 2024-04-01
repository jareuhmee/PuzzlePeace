import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { defaultStyles } from "../../constants/Styles";
import Colors from "../../constants/Colors";

export default function NewEntry() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <Text style={defaultStyles.title}>Test</Text>
      <Text>Test at Test</Text>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened before?</Text>
        <Text style={styles.title}>Triggers</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened during?</Text>
        <Text style={styles.title}>Behaviors</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened after?</Text>
        <Text style={styles.title}>Resolutions</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>Note</Text>
        <TextInput
          style={styles.input}
          multiline
          // numberOfLines={20}
          placeholder="Add note..."
        />
      </View>

      <View style={defaultStyles.container}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  containerContent: {
    // flex: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  box: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 2,
    width: "90%",
  },
  expandButton: {
    padding: 5,
    borderRadius: 30,
    borderColor: Colors.tint,
    borderWidth: 1,
    width: 30,
    height: 30,
    position: "absolute",
    right: 10,
    top: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "black",
  },
  h1: {
    fontSize: 20,
    fontFamily: "DMSans",
    color: Colors.primary,
  },
  text: {
    fontSize: 12,
    fontFamily: "DMSans",
    color: "black",
  },
  textSmall: {
    fontSize: 12,
    fontFamily: "DMMono",
    color: "black",
  },

  intensityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginVertical: 5,
  },
  intensityBox: {
    width: 15,
    height: 10,
    borderRadius: 2,
    backgroundColor: Colors.tint,
  },
  emptyBox: {
    width: 15,
    height: 10,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: Colors.tint,
  },
  intensityText: {
    fontSize: 10,
    fontFamily: "DMMono",
    color: "black",
  },

  behaviorContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  behavior: {
    padding: 5,
    borderRadius: 2,
    backgroundColor: "#eee",
  },
  behaviorText: {
    fontSize: 11,
    fontFamily: "DMMono",
    color: "black",
  },
  input: {
    marginVertical: 4,
    width: "100%",
    // height: "40px",
    // borderWidth: 2,
    // borderRadius: 4,
    // borderColor: "gray",
    // padding: 10,
    // backgroundColor: "white",
  },
});
