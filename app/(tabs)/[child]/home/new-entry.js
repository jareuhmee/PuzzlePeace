import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { defaultStyles } from "../../../../constants/Styles";
import Colors from "../../../../constants/Colors";

import { getChild, createEntry } from "../../../../firebase/requests";

export default function NewEntry() {
  const { child } = useLocalSearchParams();

  const [commonTriggers, setCommonTriggers] = useState([]);
  const [commonBehaviors, setCommonBehaviors] = useState([]);
  const [commonResolutions, setCommonResolutions] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const scrollViewRef = useRef(null);
  const locationInputRef = useRef(null);

  useEffect(() => {
    getChild(child)
      .then((childData) => {
        setCommonTriggers(childData.commonTriggers || []);
        setCommonBehaviors(childData.commonBehaviors || []);
        setCommonResolutions(childData.commonResolutions || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
      });
  }, [child]);

  const [date, setDate] = useState(new Date());
  const [timeExperience, setTimeExperience] = useState(new Date());
  const [intensity, setIntensity] = useState(1);
  const [location, setLocation] = useState("");
  const [triggers, setTriggers] = useState([]);
  const [behaviors, setBehaviors] = useState([]);
  const [resolutions, setResolutions] = useState([]);
  const [note, setNote] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDateDoneButton, setShowDateDoneButton] = useState(false);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showTimeDoneButton, setShowTimeDoneButton] = useState(false);

  const handleInputChange = (text) => {
    setLocation(text);
  };

  const handleDatePress = () => {
    if (showDatePicker) {
      setShowDatePicker(false);
      setShowDateDoneButton(false);
    } else {
      if (showTimePicker) {
        setShowTimePicker(false);
        setShowTimeDoneButton(false);
      }

      setShowDatePicker(true);
      setShowDateDoneButton(true);
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleTimePress = () => {
    if (showTimePicker) {
      setShowTimePicker(false);
      setShowTimeDoneButton(false);
    } else {
      if (showDatePicker) {
        setShowDatePicker(false);
        setShowDateDoneButton(false);
      }

      setShowTimePicker(true);
      setShowTimeDoneButton(true);
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleDateChange = (event, selectedDate) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleTimeExperienceChange = (event, selectedTime) => {
    const curentTime = selectedTime || timeExperience;
    setTimeExperience(curentTime);
  };

  const handleIntensitySelect = (level) => {
    setIntensity(level);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleAddTrigger = () => {
    router.replace("/(auth)/child-select");
    router.replace(`${child}/home`);
    router.navigate(`/(customize)/${child}/add-triggers`);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleAddBehavior = () => {
    router.replace("/(auth)/child-select");
    router.replace(`${child}/home`);
    router.navigate(`/(customize)/${child}/add-behaviors`);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleAddResolution = () => {
    router.replace("/(auth)/child-select");
    router.replace(`${child}/home`);
    router.navigate(`/(customize)/${child}/add-resolutions`);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

  const submitEntry = async () => {
    setSubmitting(true);

    if (!location.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        "Location Required",
        "Please enter a location before submitting the entry."
      );

      scrollViewRef.current.scrollTo({ y: locationInputRef.current.offsetTop });

      return;
    }

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

    await createEntry(
      formattedDate,
      formattedTimeEntry,
      formattedTimeExperience,
      intensity,
      location,
      triggers,
      behaviors,
      resolutions,
      note,
      child
    );

    setSubmitting(false);

    router.replace("/(auth)/child-select");
    router.replace(`${child}/home`);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const intensityColors = [
    "",
    "#76B18F",
    "#8DB483",
    "#A3B777",
    "#BABA6B",
    "#D0BC5F",
  ];

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.containerContent}
      showsVerticalScrollIndicator={false}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={styles.box}>
            <Text style={styles.h1}>Details</Text>
            <View
              style={[
                styles.inputContainer,
                submitting && !location.trim() && styles.inputError,
              ]}
            >
              <TextInput
                ref={locationInputRef}
                style={[{ padding: 15, fontFamily: "DMMono" }]}
                value={location}
                onChangeText={handleInputChange}
                placeholder="Enter Location"
                returnKeyType="done"
              />
            </View>

            <TouchableOpacity
              onPress={handleDatePress}
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Text
                style={{ padding: 15, color: "#333", fontFamily: "DMMono" }}
              >
                Date: {date.toLocaleDateString()}
              </Text>
              {showDateDoneButton && showDatePicker && (
                <Text
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 15,
                    color: "#333",
                    fontFamily: "DMSans",
                  }}
                >
                  Done
                </Text>
              )}
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="inline"
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity
              onPress={handleTimePress}
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Text
                style={{ padding: 15, color: "#333", fontFamily: "DMMono" }}
              >
                Time:{" "}
                {timeExperience.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
              {showTimeDoneButton && showTimePicker && (
                <Text
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 15,
                    color: "#333",
                    fontFamily: "DMSans",
                  }}
                >
                  Done
                </Text>
              )}
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={timeExperience}
                mode="time"
                display="spinner"
                onChange={handleTimeExperienceChange}
              />
            )}
          </View>

          <View style={styles.box}>
            <Text style={styles.h1}>What happened before?</Text>
            <Text style={styles.h2}>Select Triggers</Text>
            <View style={styles.buttonContainer}>
              {commonTriggers.map((trigger) => (
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
                onPress={handleAddTrigger}
              >
                <Text style={[styles.buttonText]}>Add Trigger +</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.h1}>What happened during?</Text>
            <Text style={styles.h2}>Select Behaviors</Text>
            <View style={styles.buttonContainer}>
              {commonBehaviors.map((behavior) => (
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
                onPress={handleAddBehavior}
              >
                <Text style={[styles.buttonText]}>Add Behavior +</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.h2}>Select Intensity Level</Text>
            <Text style={[styles.h3, { color: "#333" }]}>
              Intensity Level: {intensity}
            </Text>
            <View style={styles.intensityContainer}>
              {[1, 2, 3, 4, 5].map((level) => (
                <Pressable
                  key={level}
                  style={[
                    styles.emptyBox,
                    intensity >= level
                      ? {
                          backgroundColor: intensityColors[intensity],
                          borderColor: intensityColors[intensity],
                        }
                      : {
                          backgroundColor: Colors.background,
                          borderColor: intensityColors[intensity],
                        },
                  ]}
                  onPress={() => handleIntensitySelect(level)}
                />
              ))}
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.h1}>What happened after?</Text>
            <Text style={styles.h2}>Select Resolutions</Text>
            <View style={styles.buttonContainer}>
              {commonResolutions.map((resolution) => (
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
                onPress={handleAddResolution}
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
              returnKeyType="done"
              blurOnSubmit={true}
              scrollEnabled={false}
            />
          </View>

          <TouchableOpacity
            style={defaultStyles.signUpPageCABtn}
            onPress={submitEntry}
          >
            <Text style={defaultStyles.btnText}>Submit Entry</Text>
          </TouchableOpacity>
        </>
      )}
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
  h3: {
    fontSize: 12,
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
    gap: 6,
    marginVertical: 5,
  },
  intensityBox: {
    width: 45,
    height: 30,
    borderRadius: 4,
    backgroundColor: Colors.tint,
  },
  emptyBox: {
    width: 45,
    height: 30,
    borderRadius: 4,
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

  inputContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  input: {
    marginVertical: 4,
    width: "100%",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 2,
  },
});
