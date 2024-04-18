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
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import BarGraph from "../../../components/BarGraph.js"
import PieGraph from "../../../components/PieGraph.js";
import { auth } from "../../../firebase/firebase.js";
import { getUser, getChild} from "../../../firebase/requests.js"

export default function Stats() {
  const { child } = useGlobalSearchParams();
  const [statistics, setStatistics] = useState(mockStats);
  const userID = auth.currentUser.uid;
  const [children, setChildren] = useState([]);
  //handles change of user account
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
    ({ childID, childName }) => (
      <TouchableOpacity
        key={childID}
        style={styles_stats.itemContainer}
        onPress={() => {
          // router.replace(item);
          router.replace("/(auth)/child-select");
          router.replace(`${childID}/stats`);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
      >
        <Text style={styles_stats.btnText}>{childName}</Text>
      </TouchableOpacity>
    ),
    []
  );

  useEffect(() => {

  }, [])

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
      {/* Child Name */}
      <TouchableOpacity
        style={styles_stats.nameContainer}
        onPress={handleChildSelect}
      >
        <Text style={defaultStyles.title}>{childName}</Text>
        <FontAwesome name="caret-down" size={30} color={Colors.primary} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{paddingBottom: 200, alignItems: 'center'}}>
      <Text style={styles_stats.header}> Insights for {childName}</Text>
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
    alignSelf: 'flex-start',
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