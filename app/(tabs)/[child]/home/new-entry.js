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
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { defaultStyles } from "../../../../constants/Styles";
import Colors from "../../../../constants/Colors";

import { createEntry } from "../../../../firebase/requests";

export default function NewEntry() {
  const { child } = useLocalSearchParams();

  const [date, setDate] = useState(new Date());
  const [timeExperience, setTimeExperience] = useState(new Date());
  const [intensity, setIntensity] = useState(0);
  const [location, setLocation] = useState("");
  const [triggers, setTriggers] = useState([]);
  const [behaviors, setBehaviors] = useState([]);
  const [resolutions, setResolutions] = useState([]);
  const [note, setNote] = useState("");

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleTimeExperienceChange = (event, selectedTime) => {
    const curentTime = selectedTime || timeExperience;
    setTimeExperience(curentTime);
  };

  const toggleTrigger = (trigger) => {
    if (triggers.includes(trigger)) {
      setTriggers(triggers.filter((item) => item !== trigger));
    } else {
      setTriggers([...triggers, trigger]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const toggleBehavior = (behavior) => {
    if (behaviors.includes(behavior)) {
      setBehaviors(behaviors.filter((item) => item !== behavior));
    } else {
      setBehaviors([...behaviors, behavior]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const toggleResolution = (resolution) => {
    if (resolutions.includes(resolution)) {
      setResolutions(resolutions.filter((item) => item !== resolution));
    } else {
      setResolutions([...resolutions, resolution]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const submitEntry = () => {
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTimeExperience = timeExperience.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const formattedTimeEntry = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    console.log(
      formattedDate,
      formattedTimeEntry,
      formattedTimeExperience,
      location,
      triggers,
      behaviors,
      resolutions,
      note
    );
    createEntry(
      formattedDate,
      formattedTimeEntry,
      formattedTimeExperience,
      3, // TODO
      "Home", // TODO
      triggers,
      behaviors,
      resolutions,
      note,
      child
    );

    router.replace("/(auth)/child-select");
    router.replace(`${child}/home`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <Text style={styles.h2}>ChildID: {child}</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={handleDateChange}
        style={defaultStyles.h2}
      />

      <DateTimePicker
        value={timeExperience}
        mode="time"
        display="default"
        onChange={handleTimeExperienceChange}
      />

      <View style={styles.box}>
        <Text style={styles.h1}>What happened before?</Text>
        <Text style={styles.h2}>Select Triggers</Text>
        <View style={styles.buttonContainer}>
          {Array.from(mockEntries[0].triggers).map((trigger) => (
            <TouchableOpacity
              key={trigger}
              style={[
                styles.button,
                triggers.includes(trigger) && {
                  backgroundColor: Colors.tint,
                },
              ]}
              onPress={() => toggleTrigger(trigger)}
            >
              <Text
                style={[
                  styles.buttonText,
                  triggers.includes(trigger) && { color: "white" },
                ]}
              >
                {trigger}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.navigate("/(customize)/add-triggers")}
          >
            <Text style={[styles.buttonText]}>Add Trigger +</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened during?</Text>
        <Text style={styles.h2}>Select Behaviors</Text>
        <View style={styles.buttonContainer}>
          {Array.from(mockEntries[0].behaviors).map((behavior) => (
            <TouchableOpacity
              key={behavior}
              style={[
                styles.button,
                behaviors.includes(behavior) && {
                  backgroundColor: Colors.tint,
                },
              ]}
              onPress={() => toggleBehavior(behavior)}
            >
              <Text
                style={[
                  styles.buttonText,
                  behaviors.includes(behavior) && { color: "white" },
                ]}
              >
                {behavior}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.navigate("/(customize)/add-behaviors")}
          >
            <Text style={[styles.buttonText]}>Add Behavior +</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.h2}>Select Intensity Level</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened after?</Text>
        <Text style={styles.h2}>Select Resolutions</Text>
        <View style={styles.buttonContainer}>
          {Array.from(mockEntries[0].resolutions).map((resolution) => (
            <TouchableOpacity
              key={resolution}
              style={[
                styles.button,
                resolutions.includes(resolution) && {
                  backgroundColor: Colors.tint,
                },
              ]}
              onPress={() => toggleResolution(resolution)}
            >
              <Text
                style={[
                  styles.buttonText,
                  resolutions.includes(resolution) && {
                    color: "white",
                  },
                ]}
              >
                {resolution}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.navigate("/(customize)/add-resolutions")}
          >
            <Text style={[styles.buttonText]}>Add Resolution +</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>Note</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Add note..."
          onChangeText={(text) => setNote(text)}
        />
      </View>

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
  h1: {
    fontSize: 20,
    paddingBottom: 5,
    fontFamily: "DMSans",
    color: Colors.primary,
  },
  h2: {
    fontSize: 16,
    paddingBottom: 5,
    fontFamily: "DMSans",
    color: "black",
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
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#eee",
  },
  addBtn: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
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
