import { useState, useRef, useCallback } from "react";
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
import { useGlobalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Colors from "../../../constants/Colors.js";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import BarGraph from "../../../components/BarGraph.js"
import PieGraph from "../../../components/PieGraph.js";

export default function Stats() {
  const { child } = useGlobalSearchParams();
  const [timeFrame, setTimeFrame] = useState("1W"); //1W, 1M, 3M, 6M, 1Y
  const [statistics, setStatistics] = useState(mockStats);
  const bottomSheetRef = useRef(null);
  //handle reRender on changing TimeFrame
  //recomputation of graphs: 
  //handle switching child across home and stats.js
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
  //render list of names
  const renderItem = useCallback(
    (item) => (
      <TouchableOpacity
        key={item}
        style={styles_stats.itemContainer}
        onPress={() => {
          router.replace(item);
          router.navigate(`${item}/home`);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
      >
        <Text style={styles_stats.btnText}>{item}</Text>
      </TouchableOpacity>
    ),
    []
  );
  const handleChildSelect = () => (
    bottomSheetRef.current.present(),
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  );


  //subcomponents
  const GenStatCard = ({statisticTitle, value}) => {
    return(
      <View style={styles_stats.statCard}>
        <Text style={styles_stats.statCardHeader}>{statisticTitle}</Text>
        <Text style={styles_stats.statValue}>{value}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles_stats.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 200, alignItems: 'center'}}>
      <View style={styles_stats.buttonContainer}>
        {timeFrames.map((item, index) => (
          <Pressable
            id={index}
            onPress={() => setTimeFrame(item)}
            style={timeFrame === item ? styles_stats.btnClicked : styles_stats.btn}>
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles_stats.header}>General Statistics</Text>
      <View style={styles_stats.genStatContainer}>
          <View style={styles_stats.row}>
            <GenStatCard 
            statisticTitle={"Total Meltdowns"}
            value={statistics.totalMeltdowns}
            ></GenStatCard>
            <GenStatCard 
            statisticTitle={"Most Common Trigger"}
            value={statistics.mostCommonTrigger}
            ></GenStatCard>
          </View>
          <View style={styles_stats.row}>
            <GenStatCard 
            statisticTitle={"Average Intensity"}
            value={statistics.averageIntensity}
            ></GenStatCard>
            <GenStatCard 
            statisticTitle={"Most Used Resolution"}
            value={statistics.mostUsedResolution}
            ></GenStatCard>
          </View>
      </View>
      {/* Bar Graph for total meltdowns */}
      <BarGraph barData={statistics.barData}></BarGraph>
      <PieGraph pieData={statistics.triggerData}></PieGraph>
      </ScrollView>
    </SafeAreaView>
  );
}
const timeFrames = ["1W", "1M", "3M", "6M", "1Y"];

//data we want to load will look like this object
const mockStats = {
  childName: "Jenna",
  totalMeltdowns: 4,
  mostCommonTrigger: "Loud Environment",
  averageIntensity: "3.57",
  mostUsedResolution: "Fidget Toys",

  barData: {
    startDate: 'Feb 25',
    endDate: 'Mar 24',
    timeEndPoints: ['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5'],
  },

  triggerData:  {
    name: "Trigger Occurrences",
    childName: "Jenna",
    pieData: [
        {value: 8, name: 'Loud Noises'},
        {value: 6, name: 'Routine change'},
        {value: 4, name: 'Waiting in line'},
        {value: 4, name: 'Scolding'},
        {value: 2, name: 'Too many options'}
    ]
}
  
}

const mockChildren = {
  0: "Alice",
  1: "Bryan",
  2: "Cole",
  3: "Jemar",
  4: "John",
  5: "Maddy",
};

//Styles
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
  buttonContainer: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.primary,
    display: "flex",
    flexDirection: "row",
    height: 30,
    justifyContent: "space-evenly",
    marginHorizontal: 12,
    marginVertical: 10,
    width: "75%",

  },
  btn: {
    borderColor: Colors.primary,
    color: "black", 
    borderWidth: 2,
    alignSelf: "stretch"
  },
  btnClicked: {
    backgroundColor: Colors.primary,
    fontStyle: "bold",
    borderWidth: 2
  },
  itemContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  header: {
    alignSelf: 'left',
    fontSize: 22,
    fontFamily: "DMSans",
    color: Colors.primary,
    marginHorizontal: 24,
    marginTop: 20
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  genStatContainer: {
    justifyContent: 'center',
    width: 350
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
    width: 130,
    height: 80
  },
  statCardHeader: {
    fontFamily: "DMSans",
    fontWeight: "200",
    fontSize: 12,
    color: Colors.primary

  },
  statValue: {
    alignSelf: "center",
    textAlign: 'center',
    fontFamily: "DMSans",
    marginTop: 10,
    fontSize: 14
  }
});