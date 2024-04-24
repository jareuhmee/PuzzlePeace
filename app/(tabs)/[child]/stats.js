import { useState, useRef, useEffect, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { defaultStyles } from "../../../constants/Styles.js";
import { router, useGlobalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Colors from "../../../constants/Colors.js";
import * as Haptics from "expo-haptics";
import BarGraph from "../../../components/BarGraph.js";
import PieGraph from "../../../components/PieGraph.js";
import { auth } from "../../../firebase/firebase.js";
import { getUser, getChild } from "../../../firebase/requests.js";

export default function Stats() {
  const { child } = useGlobalSearchParams();
  const [currChild, setCurrChild] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (child) {
      getChild(child)
        .then((childData) => {
          setCurrChild(childData || {});
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching child1:", error);
        });
    }
  }, [child]);

  // Subcomponents
  const GenStatCard = ({ statisticTitle, value }) => {
    return (
      <View style={styles_stats.statCard}>
        <Text style={styles_stats.statCardHeader}>{statisticTitle}</Text>
        <Text style={styles_stats.statValue}>{value}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles_stats.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200, alignItems: "center" }}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text style={styles_stats.header}>
              {" "}
              Insights for {currChild.childName}
            </Text>

            {/* General Statistics */}
            <View style={styles_stats.genStatContainer}>
              <View style={styles_stats.row}>
                <GenStatCard
                  statisticTitle={"Total Meltdowns"}
                  value={currChild.totalMeltdowns}
                ></GenStatCard>
                <GenStatCard
                  statisticTitle={"Most Common Trigger"}
                  value={currChild.mostCommonTrigger}
                ></GenStatCard>
              </View>
              <View style={styles_stats.row}>
                <GenStatCard
                  statisticTitle={"Average Intensity"}
                  value={currChild.averageIntensity}
                ></GenStatCard>
                <GenStatCard
                  statisticTitle={"Most Used Resolution"}
                  value={currChild.mostUsedResolution}
                ></GenStatCard>
              </View>
            </View>

            {/* Bar Graph for total meltdowns */}
            {/* <BarGraph barData={statistics.barData}></BarGraph> */}
            <PieGraph
              pieData={{
                name: "Trigger Occurrences",
                header: currChild.childName + "'s Triggers",
                pieData: Object.entries(currChild.talliedTriggers).map(
                  ([name, value]) => ({
                    name,
                    value,
                  })
                ),
              }}
            />

            <PieGraph
              pieData={{
                name: "Behavior Occurrences",
                header: currChild.childName + "'s Behaviors",
                pieData: Object.entries(currChild.talliedBehaviors).map(
                  ([name, value]) => ({
                    name,
                    value,
                  })
                ),
              }}
            />

            <PieGraph
              pieData={{
                name: "Resolutions Occurrences",
                header: currChild.childName + "'s Resolutions",
                pieData: Object.entries(currChild.talliedResolutions).map(
                  ([name, value]) => ({
                    name,
                    value,
                  })
                ),
              }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Data we want to load will look like this object
// const mockStats = {
//   childName: "Jenna",
//   totalMeltdowns: 4,
//   mostCommonTrigger: "Loud Environment",
//   averageIntensity: "3.57",
//   mostUsedResolution: "Fidget Toys",

//   barData: {
//     startDate: "Feb 25",
//     endDate: "Mar 24",
//     timeEndPoints: ["Wk1", "Wk2", "Wk3", "Wk4", "Wk5"],
//   },

//   triggerData: {
//     name: "Trigger Occurrences",
//     childName: "Jenna",
//     pieData: [
//       { value: 8, name: "Loud Noises" },
//       { value: 6, name: "Routine change" },
//       { value: 4, name: "Waiting in line" },
//       { value: 4, name: "Scolding" },
//       { value: 2, name: "Too many options" },
//     ],
//   },
// };

// Styles
const styles_stats = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 20,
  },
  btn: {
    borderColor: Colors.primary,
    color: "black",
    borderWidth: 2,
    alignSelf: "stretch",
  },
  btnClicked: {
    backgroundColor: Colors.primary,
    fontStyle: "bold",
    borderWidth: 2,
  },
  itemContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 22,
    fontFamily: "DMSans",
    color: Colors.primary,
    marginHorizontal: 24,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  genStatContainer: {
    justifyContent: "center",
    marginTop: 20,
    width: "90%",
  },
  statCard: {
    flexDirection: "column",
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.grey,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 5,
    paddingBottom: 20,
    width: "40%",
  },
  statCardHeader: {
    fontFamily: "DMSans",
    fontWeight: "200",
    fontSize: 12,
    color: Colors.primary,
    textAlign: "center",
  },
  statValue: {
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "DMSans",
    marginTop: 10,
    fontSize: 16,
  },
});
