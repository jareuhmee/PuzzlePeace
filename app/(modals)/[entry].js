import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { defaultStyles } from "../../constants/Styles";
import { useLocalSearchParams } from "expo-router";
import Colors from "../../constants/Colors";

import { getEntry } from "../../firebase/requests";

export default function Entry() {
  const { entry } = useLocalSearchParams();
  const [currEntry, setCurrEntry] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEntry(entry)
      .then((entryData) => {
        setCurrEntry(entryData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
      });
  }, [entry]);

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      {loading ? ( // Conditional rendering based on loading state
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={defaultStyles.title}>{formatDate(currEntry.date)}</Text>
          <Text>
            <Text style={{ fontSize: 16, fontFamily: "DMMono" }}>
              {currEntry.time_experience} at {currEntry.location}
            </Text>
          </Text>

          <View style={styles.box}>
            <Text style={styles.h1}>What happened before?</Text>
            <Text style={styles.title}>Triggers:</Text>

            <View style={styles.behaviorContainer}>
              {Array.from(currEntry.triggers).map((trigger) => (
                <View key={trigger} style={styles.trigger}>
                  <Text key={trigger} style={styles.triggerText}>
                    {trigger}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.h1}>What happened during?</Text>
            <Text style={styles.title}>Behaviors:</Text>
            <View style={styles.behaviorContainer}>
              {Array.from(currEntry.behaviors).map((behavior) => (
                <View key={behavior} style={styles.behavior}>
                  <Text key={behavior} style={styles.behaviorText}>
                    {behavior}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.title}>Intensity:</Text>
            <View style={styles.intensityContainer}>
              {Array.from({
                length: parseInt(currEntry.intensity),
              }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.intensityBox,
                    {
                      backgroundColor: intensityColors[currEntry.intensity],
                    },
                  ]}
                />
              ))}
              {Array.from({
                length: 5 - parseInt(currEntry.intensity),
              }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.emptyBox,
                    {
                      borderColor: intensityColors[currEntry.intensity],
                    },
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.h1}>What happened after?</Text>
            <Text style={styles.title}>Resolutions:</Text>
            <View style={styles.resolutionContainer}>
              {Array.from(currEntry.resolutions).map((resolution) => (
                <View key={resolution} style={styles.resolution}>
                  <Text key={resolution} style={styles.resolutionText}>
                    {resolution}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.h1}>Notes:</Text>
            <Text style={styles.text}>{currEntry.notes}</Text>
          </View>
        </>
      )}
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  containerContent: {
    // flex: 1,
    alignItems: "center",
    marginVertical: 10,
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
    //Trigger
    fontSize: 16,
    padding: 5,
    fontFamily: "DMSans",
    color: "black",
  },
  h1: {
    //Questions
    fontSize: 20,
    fontFamily: "DMSans",
    color: Colors.primary,
  },
  text: {
    padding: 5,
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
  triggerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  trigger: {
    padding: 5,
    borderRadius: 2,
    backgroundColor: "#eee",
  },
  triggerText: {
    fontSize: 11,
    fontFamily: "DMMono",
    color: "black",
  },
  resolutionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  resolution: {
    padding: 5,
    borderRadius: 2,
    backgroundColor: "#eee",
  },
  resolutionText: {
    fontSize: 11,
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
  intensityText: {
    fontSize: 10,
    fontFamily: "DMMono",
    color: "black",
  },
});
