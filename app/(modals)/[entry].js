import { StyleSheet, View, Text, ScrollView } from "react-native";
import { defaultStyles } from "../../constants/Styles";
import { useLocalSearchParams } from "expo-router";
import Colors from "../../constants/Colors";

export default function Entry() {
  const { entry } = useLocalSearchParams();
  const intensityColors = [
    "",
    "#76B18F",
    "#8DB483",
    "#A3B777",
    "#BABA6B",
    "#D0BC5F",
  ];

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
        <Text style={{ fontSize: 16 }}>
          {mockEntries[entry].time} at {mockEntries[entry].location}
        </Text>
      </Text>

      <View style={styles.box}>
        <Text style={styles.h1}>What happened before?</Text>
        <Text style={styles.title}>Triggers:</Text>

        <View style={styles.behaviorContainer}>
          {Array.from(mockEntries[entry].triggers).map((trigger) => (
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
          {Array.from(mockEntries[entry].behaviors).map((behavior) => (
            <View key={behavior} style={styles.behavior}>
              <Text key={behavior} style={styles.behaviorText}>
                {behavior}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.intensityContainer}>
          {Array.from({
            length: parseInt(mockEntries[entry].intensity),
          }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.intensityBox,
                {
                  backgroundColor:
                    intensityColors[mockEntries[entry].intensity],
                },
              ]}
            />
          ))}
          {Array.from({
            length: 5 - parseInt(mockEntries[entry].intensity),
          }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.emptyBox,
                {
                  borderColor: intensityColors[mockEntries[entry].intensity],
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
          {Array.from(mockEntries[entry].resolutions).map((resolution) => (
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
        <Text style={styles.text}>{mockEntries[entry].note}</Text>
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

const mockEntries = {
  0: {
    day: "WEDNESDAY",
    date: "FEB 28",
    time: "12:30 PM",
    location: "Oak's Mall",
    triggers: ["Too loud", "Crowded", "Uncomfortable Social Interactions"],
    behaviors: ["Screaming", "Hitting"],
    resolutions: ["Leaving the mall", "Wrapping in their blanket"],
    intensity: 2,
    note: "During a visit to Oak's Mall, Alice was overwhelmed by the bustling environment.",
  },
  1: {
    day: "TUESDAY",
    date: "FEB 27",
    time: "8:00 AM",
    location: "Home",
    triggers: ["Too loud", "Crowded", "Uncomfortable Social Interactions"],
    behaviors: ["Crying", "Yelling", "Hitting"],
    resolutions: ["Leaving the mall", "Wrapping in their blanket"],
    intensity: 1,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  2: {
    day: "MONDAY",
    date: "FEB 26",
    time: "8:00 AM",
    location: "Home",
    triggers: ["Too loud", "Crowded", "Uncomfortable Social Interactions"],
    behaviors: ["Crying", "Yelling", "Hitting"],
    resolutions: ["Leaving the mall", "Wrapping in their blanket"],
    intensity: 4,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  3: {
    day: "SUNDAY",
    date: "FEB 25",
    time: "8:00 AM",
    location: "Home",
    triggers: ["Too loud", "Crowded", "Uncomfortable Social Interactions"],
    behaviors: ["Crying", "Yelling", "Hitting"],
    resolutions: ["Leaving the mall", "Wrapping in their blanket"],
    intensity: 2,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  4: {
    day: "SATURDAY",
    date: "FEB 24",
    time: "8:00 AM",
    location: "Home",
    triggers: ["Too loud", "Crowded", "Uncomfortable Social Interactions"],
    behaviors: ["Crying", "Yelling", "Hitting"],
    resolutions: ["Leaving the mall", "Wrapping in their blanket"],
    intensity: 3,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  5: {
    day: "FRIDAY",
    date: "FEB 23",
    time: "8:00 AM",
    location: "Home",
    triggers: ["Too loud", "Crowded", "Uncomfortable Social Interactions"],
    behaviors: ["Crying", "Yelling", "Hitting"],
    resolutions: ["Leaving the mall", "Wrapping in their blanket"],
    intensity: 5,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  6: {
    day: "THURSDAY",
    date: "FEB 22",
    time: "8:00 AM",
    location: "Home",
    triggers: ["Too loud", "Crowded", "Uncomfortable Social Interactions"],
    behaviors: ["Crying", "Yelling", "Hitting"],
    resolutions: ["Leaving the mall", "Wrapping in their blanket"],
    intensity: 4,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
  7: {
    day: "WEDNESDAY",
    date: "FEB 21",
    time: "8:00 AM",
    location: "Home",
    triggers: ["Too loud", "Crowded", "Uncomfortable Social Interactions"],
    behaviors: ["Crying", "Yelling", "Hitting"],
    resolutions: ["Leaving the mall", "Wrapping in their blanket"],
    intensity: 1,
    note: "During a visit to Oak's Mall, John was overwhelmed by the bustling environment.",
  },
};
