import { TouchableOpacity, Text, View } from "react-native";
import { defaultStyles } from "../../constants/Styles.js";
import { router } from "expo-router";

export default function Customize() {
  return (
    <>
      <View style={defaultStyles.container}>
        <TouchableOpacity
          style={defaultStyles.btn}
          onPress={() => router.navigate("./add-triggers")}
        >
          <Text style={defaultStyles.btnText}>Add Triggers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={defaultStyles.btn}
          onPress={() => router.navigate("./add-behaviors")}
        >
          <Text style={defaultStyles.btnText}>Add Behaviors</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={defaultStyles.btn}
          onPress={() => router.navigate("./add-resolutions")}
        >
          <Text style={defaultStyles.btnText}>Add Resolutions</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
