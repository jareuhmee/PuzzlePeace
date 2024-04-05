import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { defaultStyles } from "../../constants/Styles";
import Colors from "../../constants/Colors";

export default function NewEntry() {
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [selectedBehaviors, setSelectedBehaviors] = useState([]);
  const [selectedResolutions, setSelectedResolutions] = useState([]);

  const toggleTrigger = (trigger) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter((item) => item !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const toggleBehavior = (behavior) => {
    if (selectedBehaviors.includes(behavior)) {
      setSelectedBehaviors(
        selectedBehaviors.filter((item) => item !== behavior)
      );
    } else {
      setSelectedBehaviors([...selectedBehaviors, behavior]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const toggleResolution = (resolution) => {
    if (selectedResolutions.includes(resolution)) {
      setSelectedResolutions(
        selectedResolutions.filter((item) => item !== resolution)
      );
    } else {
      setSelectedResolutions([...selectedResolutions, resolution]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const submitEntry = () => {
    console.log(selectedTriggers, selectedBehaviors, selectedResolutions);
  };

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
        <View style={styles.buttonContainer}>
          {Array.from(mockEntries[0].triggers).map((trigger) => (
            <TouchableOpacity
              key={trigger}
              style={[
                styles.button,
                selectedTriggers.includes(trigger) && {
                  backgroundColor: Colors.tint,
                },
              ]}
              onPress={() => toggleTrigger(trigger)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedTriggers.includes(trigger) && { color: "white" },
                ]}
              >
                {trigger}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened during?</Text>
        <Text style={styles.title}>Behaviors</Text>
        <View style={styles.buttonContainer}>
          {Array.from(mockEntries[0].behaviors).map((behavior) => (
            <TouchableOpacity
              key={behavior}
              style={[
                styles.button,
                selectedBehaviors.includes(behavior) && {
                  backgroundColor: Colors.tint,
                },
              ]}
              onPress={() => toggleBehavior(behavior)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedBehaviors.includes(behavior) && { color: "white" },
                ]}
              >
                {behavior}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened after?</Text>
        <Text style={styles.title}>Resolutions</Text>
        <View style={styles.buttonContainer}>
          {Array.from(mockEntries[0].resolutions).map((resolution) => (
            <TouchableOpacity
              key={resolution}
              style={[
                styles.button,
                selectedResolutions.includes(resolution) && {
                  backgroundColor: Colors.tint,
                },
              ]}
              onPress={() => toggleResolution(resolution)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedResolutions.includes(resolution) && {
                    color: "white",
                  },
                ]}
              >
                {resolution}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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

      {/* <TouchableOpacity
        style={[styles.button]}
        onPress={console.log(
          selectedBehaviors,
          selectedResolutions,
          selectedTriggers
        )}
      >
        <Text style={[styles.buttonText]}>Submit</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={defaultStyles.signUpPageCABtn}
        onPress={submitEntry}
      >
        <Text style={defaultStyles.btnText}>Submit Entry</Text>
      </TouchableOpacity>
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
    paddingBottom: 200,
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

  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  button: {
    padding: 5,
    borderRadius: 2,
    backgroundColor: "#eee",
  },
  buttonText: {
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
