import { useRef, useCallback, useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
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
import { defaultStyles } from "../../../../constants/Styles.js";
import Colors from "../../../../constants/Colors.js";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";

import { getChild, getUser, getEntry } from "../../../../firebase/requests.js";
import { auth } from "../../../../firebase/firebase.js";

export default function Home() {
  const { child } = useLocalSearchParams();

  const userID = auth.currentUser.uid;
  const [children, setChildren] = useState([]);
  const [childEntries, setChildEntries] = useState([]);

  useEffect(() => {
    getUser(userID)
      .then((userData) => {
        const childrenArray = Object.entries(userData.children || []);
        // Fetch child data for each child ID
        const promises = childrenArray.map(([childID]) =>
          getChild(childID).then((childData) => ({ childID, ...childData }))
        );
        Promise.all(promises)
          .then((childDataArray) => {
            setChildren(childDataArray);
          })
          .catch((error) => {
            console.error("Error fetching child data:", error);
          });
      })
      .catch((error) => {
        console.error("Error getting user:", error);
      });
  }, [userID]);

  const currChild = children.find((childItem) => childItem.childID === child);
  const childName = currChild ? currChild.childName : "";

  useEffect(() => {
    if (currChild) {
      const childEntryIDs = Object.entries(currChild.entries || []);
      const promises = childEntryIDs.map(([_, entryID]) => {
        return getEntry(entryID).then((entryData) => ({
          entryID,
          ...entryData,
        }));
      });
      Promise.all(promises)
        .then((entryDataArray) => {
          setChildEntries(entryDataArray);
        })
        .catch((error) => {
          console.error("Error fetching child entries:", error);
        });
    }
  }, [currChild]);

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
    ({ childID, childName }) => (
      <TouchableOpacity
        key={childID}
        style={styles.itemContainer}
        onPress={() => {
          // router.replace(item);
          router.replace("/(auth)/child-select");
          router.replace(`${childID}/home`);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
      >
        <Text style={styles.btnText}>{childName}</Text>
      </TouchableOpacity>
    ),
    []
  );

  const handleNewEntry = () => (
    router.navigate("./home/new-entry"),
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  );

  const handleOpenEntry = (entry) => (
    router.navigate(`/(modals)/${entry}`),
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  );

  const formatDate = (inputDate) => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];

    const dateObj = new Date(inputDate);
    const day = days[dateObj.getDay()];
    const month = months[dateObj.getMonth()];
    const date = dateObj.getDate();

    return `${day}, ${month} ${date}`;
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
    <SafeAreaView style={styles.container}>
      {/* Child Name */}
      <TouchableOpacity
        style={styles.nameContainer}
        onPress={handleChildSelect}
      >
        <Text style={defaultStyles.title}>{childName}</Text>
        <FontAwesome name="caret-down" size={30} color={Colors.primary} />
      </TouchableOpacity>

      {/* Previous Entries */}
      <View>
        <FlatList
          data={childEntries}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.entryID}
              style={entryStyles.entryContainer}
              onPress={() => handleOpenEntry(item.entryID)}
            >
              {/* Date */}
              <Text style={entryStyles.title}>{formatDate(item.date)}</Text>
              {/* Time & Location */}
              <Text style={entryStyles.textSmall}>
                {item.time_experience} • {item.location}
              </Text>
              {/* Intensity */}
              <View style={entryStyles.intensityContainer}>
                {Array.from({
                  length: parseInt(item.intensity),
                }).map((_, index) => (
                  <View
                    key={index}
                    style={[
                      entryStyles.intensityBox,
                      {
                        backgroundColor: intensityColors[item.intensity],
                      },
                    ]}
                  />
                ))}
                {Array.from({
                  length: 5 - parseInt(item.intensity),
                }).map((_, index) => (
                  <View
                    key={index}
                    style={[
                      entryStyles.emptyBox,
                      {
                        borderColor: intensityColors[item.intensity],
                      },
                    ]}
                  />
                ))}
              </View>
              {/* Behaviors */}
              {item.behaviors && item.behaviors.length > 0 && (
                <View style={entryStyles.behaviorContainer}>
                  {Array.from(item.behaviors).map((behavior) => (
                    <View key={behavior} style={entryStyles.behavior}>
                      <Text key={behavior} style={entryStyles.behaviorText}>
                        {behavior}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
              {/* Note */}
              {item.notes && <Text style={entryStyles.text}>{item.notes}</Text>}
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
          keyExtractor={(item) => item.entryID}
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
          {children.map(renderItem)}
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
