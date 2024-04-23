import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { defaultStyles } from "../../../constants/Styles.js";
import Colors from "../../../constants/Colors.js";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";

import { getChild, updateChildAttributes } from "../../../firebase/requests.js";

export default function AddBehaviors() {
  const { child } = useLocalSearchParams();

  const [behaviors, setBehaviors] = useState([]);
  const [newBehavior, setNewBehavior] = useState("");
  const [saveChanges, setSaveChanges] = useState(false);

  useEffect(() => {
    getChild(child)
      .then((childData) => {
        setBehaviors(childData.commonBehaviors || []);
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
      });
  }, [child]);

  const addBehavior = () => {
    if (newBehavior.trim() !== "") {
      if (behaviors.includes(newBehavior)) {
        alert("Behavior already exists!");
      } else {
        setBehaviors([...behaviors, newBehavior]);
        setNewBehavior("");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        if (!saveChanges) {
          setSaveChanges(true);
        }
      }
    }
  };

  const deleteBehavior = (behavior) => {
    setBehaviors(behaviors.filter((t) => t !== behavior));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!saveChanges) {
      setSaveChanges(true);
    }
  };

  const handleSaveChanges = () => {
    updateChildAttributes(child, { commonBehaviors: behaviors })
      .then(() => {
        console.log("Behaviors updated successfully");
        router.back();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      })
      .catch((error) => {
        console.error("Error updating behaviors:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={defaultStyles.title}>Add Behaviors</Text> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Behavior"
          value={newBehavior}
          onChangeText={setNewBehavior}
        />

        <TouchableOpacity style={styles.addButton} onPress={addBehavior}>
          <Text style={defaultStyles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {behaviors.map((behavior) => (
          <View key={behavior} style={styles.behaviorItem}>
            <Text style={styles.behaviorText}>{behavior}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteBehavior(behavior)}
            >
              <Text style={styles.deleteButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {saveChanges && (
        <TouchableOpacity
          style={[
            defaultStyles.signUpPageCABtn,
            {
              alignSelf: "center",
              marginBottom: 40,
              position: "absolute",
              bottom: 0,
            },
          ]}
          onPress={handleSaveChanges}
        >
          <Text style={defaultStyles.btnText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
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
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    width: "100%",
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
    // marginTop: 10,
    // marginBottom: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  behaviorItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  behaviorText: {
    flex: 1,
    marginRight: 5,
    fontFamily: "DMMono",
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
