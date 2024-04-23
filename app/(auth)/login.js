import { useState } from "react";
import { router } from "expo-router";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../../firebase/firebase.js";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { defaultStyles } from "../../constants/Styles.js";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import * as Haptics from "expo-haptics";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const signIn = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      Alert.alert("Log In Failed", "Please enter a valid email and password.");
    } finally {
      setLoading(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const navigateToPasswordReset = () => {
    router.replace("/(auth)/pw-reset");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={defaultStyles.container} behavior="padding">
        <FontAwesomeIcon
          icon={faInfinity}
          style={defaultStyles.iconOnLogin}
          size={70}
        />
        <View>
          <Text style={defaultStyles.loginPageLogIn}>Log In</Text>
        </View>
        <View style={defaultStyles.separator3} />

        <TextInput
          style={defaultStyles.input}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInput.focus();
          }}
        />
        <TextInput
          ref={(input) => {
            passwordInput = input;
          }}
          style={defaultStyles.input}
          secureTextEntry={true}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          returnKeyType="done"
          onSubmitEditing={signIn}
        />

        <View style={defaultStyles.separator2} />

        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <>
            <TouchableOpacity
              style={defaultStyles.loginPageLoginBtn}
              onPress={signIn}
            >
              <Text style={defaultStyles.btnText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToPasswordReset}>
              <Text style={defaultStyles.loginPageForgotBtn}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
