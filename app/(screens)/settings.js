import { TouchableOpacity, Text, View } from "react-native";
import { auth } from "../../firebase/firebase.js";
import { defaultStyles } from "../../constants/Styles.js";

export default function Settings() {
  return (
    <>
      <View style={defaultStyles.container}>
        {/* <Text style={defaultStyles.title}>Reports</Text> */}
        <View style={defaultStyles.separator} />
      </View>

      <View style={defaultStyles.btnContainer}>
        <TouchableOpacity
          style={defaultStyles.btn}
          onPress={() => auth.signOut()}
        >
          <Text style={defaultStyles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
