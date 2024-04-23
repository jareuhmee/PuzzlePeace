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

export default function AddTriggers() {
  const { child } = useLocalSearchParams();

  const [triggers, setTriggers] = useState([]);
  const [newTrigger, setNewTrigger] = useState("");
  const [saveChanges, setSaveChanges] = useState(false);

  useEffect(() => {
    getChild(child)
      .then((childData) => {
        setTriggers(childData.commonTriggers || []);
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
      });
  }, [child]);

  const addTrigger = () => {
    if (newTrigger.trim() !== "") {
      if (triggers.includes(newTrigger)) {
        alert("Trigger already exists!");
      } else {
        setTriggers([...triggers, newTrigger]);
        setNewTrigger("");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        if (!saveChanges) {
          setSaveChanges(true);
        }
      }
    }
  };

  const deleteTrigger = (trigger) => {
    setTriggers(triggers.filter((t) => t !== trigger));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!saveChanges) {
      setSaveChanges(true);
    }
  };

  const handleSaveChanges = () => {
    updateChildAttributes(child, { commonTriggers: triggers })
      .then(() => {
        console.log("Triggers updated successfully");
        while (router.canGoBack()) router.back();
        router.replace("/(auth)/child-select");
        router.replace(`/(tabs)/${child}/home`);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      })
      .catch((error) => {
        console.error("Error updating triggers:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={defaultStyles.title}>Add Triggers</Text> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Trigger"
          value={newTrigger}
          onChangeText={setNewTrigger}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTrigger}>
          <Text style={defaultStyles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {triggers.map((trigger) => (
          <View key={trigger} style={styles.triggerItem}>
            <Text style={styles.triggerText}>{trigger}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTrigger(trigger)}
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
  triggerItem: {
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
  triggerText: {
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
