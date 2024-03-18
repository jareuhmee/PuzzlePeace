import { router } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { defaultStyles } from "../../constants/Styles.js";

export default function ChildSelect() {
  const renderChildButton = (child, index) => (
    <View key={index} style={{ flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 5, width: 250, marginLeft: 30 }}>
      <TouchableOpacity
        
        style={[defaultStyles.btn, { flex: 1 }]}
        onPress={() => {
          router.replace(`(tabs)/${child}/home`);
        }}
      >
        <Text style={defaultStyles.btnText}>{child}</Text>
      </TouchableOpacity>
      <View style={styles.profilePicCircle}>
        {/* profile picture content here */}
      </View>
    </View>
  );
  
  const styles = {
    profilePicCircle: {
      width: 40,
      height: 40,
      borderRadius: 20, 
      borderWidth: 2,
      borderColor: "#3a644b",
      marginRight: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Child Select</Text>
      <View style={defaultStyles.separator} />

      {Object.values(mockChildren).map(renderChildButton)}

      <TouchableOpacity
        style={defaultStyles.addChildBtn}
        onPress={() => router.replace('/(auth)/child-add')}
      >
        <Text style={defaultStyles.btnText}>Add Child</Text>
      </TouchableOpacity>
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
