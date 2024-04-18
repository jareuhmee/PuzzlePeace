import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { defaultStyles } from "../../constants/Styles.js";
import Colors from "../../constants/Colors";

export default function AddResolutions() {
  const [resolutions, setResolutions] = useState(mockEntries[0].resolutions);
  const [newResolution, setNewResolution] = useState("");

  const addResolution = () => {
    if (newResolution.trim() !== "") {
      setResolutions([...resolutions, newResolution]);
      setNewResolution("");
    }
  };

  const deleteResolution = (resolution) => {
    setResolutions(resolutions.filter((t) => t !== resolution));
  };

  return (
    <>
      <View style={styles.container}>
      <Text style={defaultStyles.title}>Add Resolutions</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter resolution"
            value={newResolution}
            onChangeText={setNewResolution}
          />
          <TouchableOpacity style={styles.addButton} onPress={addResolution}>
            <Text style={defaultStyles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {resolutions.map((resolution) => (
            <View key={resolution} style={styles.resolutionItem}>
              <Text style={styles.resolutionText}>{resolution}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteResolution(resolution)}>
                <Text style={styles.deleteButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
    paddingTop: 100, 
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    width: "90%",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: Colors.tint,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  scrollView: {
    marginTop: 10,
    marginBottom: 20,
    width: "90%",
  },
  resolutionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  resolutionText: {
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "45deg" }],
  },
  deleteButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
