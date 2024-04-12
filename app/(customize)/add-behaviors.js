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

export default function AddBehaviors() {
  const [behaviors, setBehaviors] = useState(mockEntries[0].behaviors);
  const [newBehavior, setNewBehavior] = useState("");

  const addBehavior = () => {
    if (newBehavior.trim() !== "") {
      setBehaviors([...behaviors, newBehavior]);
      setNewBehavior("");
    }
  };

  const deleteBehavior = (behavior) => {
    setBehaviors(behaviors.filter((t) => t !== behavior));
  };

  return (
    <>
      <View style={styles.container}>
      <Text style={defaultStyles.title}>Add Behaviors</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter behavior"
            value={newBehavior}
            onChangeText={setNewBehavior}
          />
          <TouchableOpacity style={styles.addButton} onPress={addBehavior}>
            <Text style={defaultStyles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {behaviors.map((behavior) => (
            <View key={behavior} style={styles.behaviorItem}>
              <Text style={styles.behaviorText}>{behavior}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteBehvaior(behavior)}>
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
    //marginBottom: 20,
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
  behaviorItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  behaviorText: {
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