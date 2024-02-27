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

  // Mock Data: List of children
  const data = useMemo(
    () =>
      Array(20)
        .fill(0)
        .map((_, index) => `Mock Data ${index + 1}`),
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
          data={data}
          renderItem={({ item }) => (
            <View style={entryStyles.prevEntryContainer}>
              <Text style={entryStyles.title}>{item}</Text>
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
        <BottomSheetScrollView>{data.map(renderItem)}</BottomSheetScrollView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}

const entryStyles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    marginBottom: -34,
  },
  prevEntryContainer: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 2,
  },
  title: {
    fontSize: 16,
    fontFamily: "DMSans",
    color: "black",
  },
  text: {
    fontSize: 24,
    fontFamily: "DMSans",
    color: "white",
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
