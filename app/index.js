import { Link } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { defaultStyles } from "../constants/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>PuzzlePeace</Text>
      <FontAwesomeIcon
        icon={faPuzzlePiece}
        style={defaultStyles.title}
        size={40}
      />
      <View style={defaultStyles.separator} />

      <Link href="/(auth)/register" asChild>
        <TouchableOpacity style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </Link>

      {/* <Link href="/(customize)/customize" asChild>
        <TouchableOpacity style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>TEST: Customize Page</Text>
        </TouchableOpacity>
      </Link> */}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={defaultStyles.loginText}>Have an account?</Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={defaultStyles}>
            <Text style={defaultStyles.loginTextBold}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
