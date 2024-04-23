import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { defaultStyles } from "../constants/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import * as Haptics from "expo-haptics";

export default function LandingPage() {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>PuzzlePeace</Text>
      <FontAwesomeIcon
        icon={faInfinity}
        style={defaultStyles.title}
        size={50}
      />
      <View style={defaultStyles.separator} />

      <TouchableOpacity
        style={defaultStyles.firstBtn}
        onPress={() => {
          router.navigate("/(auth)/register");
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <Text style={defaultStyles.btnText}>Get Started</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={defaultStyles.loginText}>Have an account?</Text>
        <TouchableOpacity
          style={defaultStyles}
          onPress={() => {
            router.navigate("/(auth)/login");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
        >
          <Text style={defaultStyles.loginTextBold}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
