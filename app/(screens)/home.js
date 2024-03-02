import { useRef, useCallback, useMemo } from "react";
import { router } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { defaultStyles } from "../../constants/Styles.js";
import Colors from "../../constants/Colors.js";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const bottomSheetRef = useRef(null);
  const handleChildSelect = () => (
    bottomSheetRef.current.present(),
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const renderItem = useCallback(
    (item) => (
      <TouchableOpacity key={item} style={styles.itemContainer}>
        <Text style={styles.btnText}>{item}</Text>
      </TouchableOpacity>
    ),
    []
  );

  const handleNewEntry = () => (
    router.navigate("/(modals)/new-entry"),
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  );

  const handleOpenEntry = () => (
    router.navigate("/(modals)/entry"),
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Child Name */}
      <TouchableOpacity
        style={styles.nameContainer}
        onPress={handleChildSelect}
      >
        <Text style={defaultStyles.title}>John Doe</Text>
        <FontAwesome name="caret-down" size={30} color={Colors.primary} />
      </TouchableOpacity>

      {/* Previous Entries */}
      <View>
        <FlatList
          data={Object.keys(mockEntries)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={entryStyles.entryContainer}
              onPress={handleOpenEntry}
            >
              {/* Date */}
              <Text style={entryStyles.title}>
                {mockEntries[item].day}, {mockEntries[item].date}
              </Text>
              {/* Time & Location */}
              <Text style={entryStyles.textSmall}>
                {mockEntries[item].time} • {mockEntries[item].location}
              </Text>
              {/* Intensity */}
              <View style={entryStyles.intensityContainer}>
                {Array.from({
                  length: parseInt(mockEntries[item].intensity),
                }).map((_, index) => (
                  <View key={index} style={entryStyles.intensityBox} />
                ))}
                {Array.from({
                  length: 5 - parseInt(mockEntries[item].intensity),
                }).map((_, index) => (
                  <View key={index} style={entryStyles.emptyBox} />
                ))}
              </View>
              {/* Behaviors */}
              <View style={entryStyles.behaviorContainer}>
                {Array.from(mockEntries[item].behaviors).map((behavior) => (
                  <View key={behavior} style={entryStyles.behavior}>
                    <Text key={behavior} style={entryStyles.behaviorText}>
                      {behavior}
                    </Text>
                  </View>
                ))}
              </View>
              {/* Note */}
              <Text style={entryStyles.text}>{mockEntries[item].note}</Text>
              {/* Expand Button */}
              <View style={entryStyles.expandButton}>
                <Feather
                  name="more-horizontal"
                  size={14}
                  color={Colors.tint}
                  style={{ alignSelf: "center" }}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingBottom: 160 }}
        />
      </View>

      {/* New Entry Button */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleNewEntry}>
          <Ionicons name="add-sharp" size={55} color={"white"} />
        </TouchableOpacity>
      </View>

      {/* Change Child Bottom Sheet */}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["50%"]}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView>
          {Object.keys(mockChildren).map((key) =>
            renderItem(mockChildren[key])
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}

const entryStyles = StyleSheet.create({
  entryContainer: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 2,
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
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 20,
  },
  itemContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  btnContainer: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    // right: 15,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.tint,
    width: 75,
    height: 75,
    borderRadius: 50,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowColor: Colors.primary,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "black",
  },
  label: {
    fontSize: 12,
    fontFamily: "DMSans",
    color: "black",
  },
});

const mockEntries = {
  0: {
    day: "WEDNESDAY",
    date: "FEB 28",
    time: "12:30 PM",
    location: "Oak's Mall",
    behaviors: ["Screaming", "Hitting"],
    intensity: 2,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  1: {
    day: "TUESDAY",
    date: "FEB 27",
    time: "8:00 AM",
    location: "Home",
    behaviors: ["Crying", "Yelling", "Hitting"],
    intensity: 1,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  2: {
    day: "MONDAY",
    date: "FEB 26",
    time: "8:00 AM",
    location: "Home",
    behaviors: ["Crying", "Yelling", "Hitting"],
    intensity: 4,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  3: {
    day: "SUNDAY",
    date: "FEB 25",
    time: "8:00 AM",
    location: "Home",
    behaviors: ["Crying", "Yelling", "Hitting"],
    intensity: 2,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  4: {
    day: "SATURDAY",
    date: "FEB 24",
    time: "8:00 AM",
    location: "Home",
    behaviors: ["Crying", "Yelling", "Hitting"],
    intensity: 3,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  5: {
    day: "FRIDAY",
    date: "FEB 23",
    time: "8:00 AM",
    location: "Home",
    behaviors: ["Crying", "Yelling", "Hitting"],
    intensity: 5,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  6: {
    day: "THURSDAY",
    date: "FEB 22",
    time: "8:00 AM",
    location: "Home",
    behaviors: ["Crying", "Yelling", "Hitting"],
    intensity: 4,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  7: {
    day: "WEDNESDAY",
    date: "FEB 21",
    time: "8:00 AM",
    location: "Home",
    behaviors: ["Crying", "Yelling", "Hitting"],
    intensity: 1,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
};

// Mock Data: List of children
const mockChildren = {
  0: "John Doe",
  1: "Jane Doe",
  2: "John Smith",
  3: "Jane Smith",
  4: "John Johnson",
  5: "Jane Johnson",
  6: "John Brown",
  7: "Jane Brown",
  8: "John Davis",
  9: "Jane Davis",
  10: "John Miller",
  11: "Jane Miller",
  12: "John Wilson",
  13: "Jane Wilson",
  14: "John Moore",
  15: "Jane Moore",
  16: "John Taylor",
  17: "Jane Taylor",
  18: "John Anderson",
  19: "Jane Anderson",
  20: "John Thomas",
};
