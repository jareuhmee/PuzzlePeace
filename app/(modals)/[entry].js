import { StyleSheet, View, Text, ScrollView } from "react-native";
import { defaultStyles } from "../../constants/Styles";
import { useLocalSearchParams } from "expo-router";
import Colors from "../../constants/Colors";

export default function Entry() {
  const { entry } = useLocalSearchParams();
  return (
    // <View style={styles.container}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <Text style={defaultStyles.title}>
        {mockEntries[entry].day}, {mockEntries[entry].date}
      </Text>
      <Text>
        {mockEntries[entry].time} at {mockEntries[entry].location}
      </Text>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened before?</Text>
        <Text style={styles.title}>Triggers:</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened during?</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened after?</Text>
      </View>
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  containerContent: {
    flex: 1,
    alignItems: "center",
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
    fontSize: 16,
    fontFamily: "DMSans",
    color: "black",
  },
  h1: {
    fontSize: 20,
    fontFamily: "DMSans",
    color: Colors.primary,
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
