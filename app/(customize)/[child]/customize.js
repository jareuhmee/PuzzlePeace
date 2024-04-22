import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { defaultStyles } from "../../../constants/Styles.js";
import { router, useLocalSearchParams } from "expo-router";
//import { useState } from "react";
//import * as Haptics from "expo-haptics";
import Colors from "../../../constants/Colors.js";

export default function Customize() {
  const { child } = useLocalSearchParams();

  const handleDone = () => {
    router.back();
  };

  return (
    <>
      <View style={defaultStyles.container}>
        {/* <Text style={defaultStyles.title}>Customize</Text> */}
        <View style={styles.box}>
          <Text style={defaultStyles.h1}>Triggers</Text>
          {/* Mock Triggers */}
          <View style={styles.behaviorContainer}>
            {Array.from(mockEntries[0].triggers).map((trigger) => (
              <View key={trigger} style={styles.behavior}>
                <Text key={trigger} style={styles.behaviorText}>
                  {trigger}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.navigate("./add-triggers")}
          >
            <Text style={defaultStyles.btnText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Text style={defaultStyles.h1}>Behaviors</Text>
          {/* Mock Behaviors */}
          <View style={styles.behaviorContainer}>
            {Array.from(mockEntries[0].behaviors).map((behavior) => (
              <View key={behavior} style={styles.behavior}>
                <Text key={behavior} style={styles.behaviorText}>
                  {behavior}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.navigate("./add-behaviors")}
          >
            <Text style={defaultStyles.btnText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Text style={defaultStyles.h1}>Resolutions</Text>
          <View style={styles.behaviorContainer}>
            {Array.from(mockEntries[0].resolutions).map((resolution) => (
              <View key={resolution} style={styles.behavior}>
                <Text key={resolution} style={styles.behaviorText}>
                  {resolution}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.navigate("./add-resolutions")}
          >
            <Text style={defaultStyles.btnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.signUpPageCABtn,
            { alignSelf: "center", marginBottom: 20 },
          ]}
          onPress={handleDone}
        >
          <Text style={defaultStyles.btnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 2,
    width: "90%",
  },
  addBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.tint,
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  behaviorContainer: {
    paddingTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
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
});

const mockEntries = {
  0: {
    name: "Alice",
    triggers: [
      "Bright Lights",
      "Loud Noises",
      "Being Touched",
      "Hungry",
      "Tired",
      "Thirsty",
      "Anxious",
      "Overwhelmed",
      "Confused",
      "Guilty",
      "Jealous",
      "Lonely",
      "Stressed",
      "Rejected",
      "Ignored",
      "Teased",
      "Threatened",
      "Disciplined",
      "Yelled At",
      "Consequences",
      "Change In Routine",
    ],
    behaviors: [
      "Screaming",
      "Crying",
      "Running",
      "Punching",
      "Kicking",
      "Jumping",
      "Biting",
    ],
    resolutions: [
      "Hugging",
      "Talking",
      "Singing",
      "Dancing",
      "Drawing",
      "Reading",
    ],
  },
  1: {
    name: "Bryan",
    triggers: ["Screaming", "Hitting"],
    behaviors: ["Screaming", "Hitting"],
    resolutions: ["Screaming", "Hitting"],
  },
};
