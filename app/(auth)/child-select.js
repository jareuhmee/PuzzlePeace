import { router } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { defaultStyles } from "../../constants/Styles.js";

export default function ChildSelect() {
  const renderChildButton = (child) => (
    <TouchableOpacity
      key={child}
      style={defaultStyles.btn}
      onPress={() => {
        router.replace(`${child}/home`);
      }}
    >
      <Text style={defaultStyles.btnText}>{child}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Child Select</Text>
      <View style={defaultStyles.separator} />

      {Object.values(mockChildren).map(renderChildButton)}
    </View>
  );
}

// Mock Data: List of children
const mockChildren = {
  0: "Alice",
  1: "Bryan",
  2: "Cole",
  3: "Jemar",
  4: "John",
  5: "Maddy",
};
