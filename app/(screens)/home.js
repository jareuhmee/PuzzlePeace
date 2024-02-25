import { useRef, useCallback, useMemo } from "react";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { defaultStyles } from "../../constants/Styles.js";
import Colors from "../../constants/Colors.js";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

export default function Home() {
  const bottomSheetRef = useRef(null);
  const handleOpenPress = () => bottomSheetRef.current.present();

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
        <Text style={defaultStyles.btnText}>{item}</Text>
      </View>
    ),
    []
  );

  // Mock Data: List of children
  const data = useMemo(
    () =>
      Array(8)
        .fill(0)
        .map((_, index) => `Child ${index + 1}`),
    []
  );

  return (
    <View style={defaultStyles.container}>
      {/* Child Name */}
      <TouchableOpacity style={styles.nameContainer} onPress={handleOpenPress}>
        <Text style={defaultStyles.title}>John Doe</Text>
        <FontAwesome name="caret-down" size={30} color="black" />
      </TouchableOpacity>

      <View style={defaultStyles.container}>
        <View style={defaultStyles.separator} />
      </View>

      {/* New Entry Button */}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.navigate("/(modals)/new-entry")}
        >
          <FontAwesome name="pencil-square-o" size={50} color="black" />
          <Text style={styles.label}>New Entry</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    gap: 10,
    marginTop: 80,
  },
  itemContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  btnContainer: {
    alignItems: "flex-end",
    padding: 20,
    width: "100%",
    backgroundColor: Colors.background,
  },
  btn: {
    alignItems: "flex-end",
    backgroundColor: Colors.background,
  },
  label: {
    fontSize: 12,
    fontFamily: "DMSans",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
