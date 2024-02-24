import { Link } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { defaultStyles } from "../constants/Styles";

export default function LandingPage() {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>PuzzlePeace</Text>
      <View style={defaultStyles.separator} />

      <Link href="/(auth)/login" asChild>
        <TouchableOpacity style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>Login</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(auth)/register" asChild>
        <TouchableOpacity style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(customize)/customize" asChild>
        <TouchableOpacity style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>TEST: Customize Page</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
