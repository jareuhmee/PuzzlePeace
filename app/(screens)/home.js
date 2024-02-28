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
      <View key={item} style={styles.itemContainer}>
        <Text style={styles.btnText}>{item}</Text>
      </View>
    ),
    []
  );

  const handleNewEntry = () => (
    router.navigate("/(modals)/new-entry"),
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
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
      <View style={entryStyles.flatListContainer}>
        <FlatList
          data={Object.keys(mockEntries)}
          renderItem={({ item }) => (
            <View style={entryStyles.entryContainer}>
              {/* Date */}
              <View style={entryStyles.leftColumn}>
                <View style={entryStyles.dateContainer}>
                  <Text style={entryStyles.dayText}>
                    {mockEntries[item].day}
                  </Text>
                  <Text style={entryStyles.dateText}>
                    {mockEntries[item].date}
                  </Text>
                </View>
              </View>
              {/* Intensity */}
              <View style={entryStyles.intensityContainer}>
                <View style={entryStyles.intensityBoxContainer}>
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
                <Text style={entryStyles.intensityText}>INTENSITY</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item}
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
  flatListContainer: {
    flex: 1,
    marginBottom: -34,
  },
  entryContainer: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "black",
  },
  text: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "black",
  },
  textSmall: {
    fontSize: 12,
    fontFamily: "DMSans",
    color: "black",
  },

  leftColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 4,
    gap: 10,
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 6,
    gap: 4,
    borderRadius: 4,
    backgroundColor: "#eee",
    width: "100%",
  },
  dayText: {
    fontSize: 12,
    fontFamily: "DMSans",
    color: "black",
  },
  dateText: {
    fontSize: 12,
    fontFamily: "DMSans",
    color: "black",
  },

  intensityContainer: {
    flexDirection: "column",
    padding: 2,
    gap: 4,
    borderRadius: 4,
  },
  intensityBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
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
    date: "FEB-28-2024",
    intensity: 2,
  },
  1: {
    day: "TUESDAY",
    date: "FEB-27-2024",
    intensity: 1,
  },
  2: {
    day: "MONDAY",
    date: "FEB-26-2024",
    intensity: 4,
  },
  3: {
    day: "SUNDAY",
    date: "FEB-25-2024",
    intensity: 2,
  },
  4: {
    day: "SATURDAY",
    date: "FEB-24-2024",
    intensity: 3,
  },
  5: {
    day: "FRIDAY",
    date: "FEB-23-2024",
    intensity: 5,
  },
  6: {
    day: "THURSDAY",
    date: "FEB-22-2024",
    intensity: 4,
  },
  7: {
    day: "WEDNESDAY",
    date: "FEB-21-2024",
    intensity: 1,
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
