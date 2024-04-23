import { useState } from "react";
import { router } from "expo-router";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../../firebase/firebase.js";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { defaultStyles } from "../../constants/Styles.js";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import { createUser } from "../../firebase/requests.js";
import * as Haptics from "expo-haptics";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [firstName, setFirstName] = useState("");

  const signUp = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      createUser(response.user.uid, email, firstName, []);

      router.replace("/(auth)/child-add");
    } catch (error) {
      console.log(error);
      Alert.alert("Sign Up Failed", error.message);
    } finally {
      setLoading(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
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
          <Text style={defaultStyles.loginPageLogIn}>Create an Account</Text>
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
          returnKeyType="next"
          onSubmitEditing={() => {
            nameInput.focus();
          }}
        />
        <TextInput
          ref={(input) => {
            nameInput = input;
          }}
          style={defaultStyles.input}
          value={firstName}
          placeholder="Your First Name"
          autoCapitalize="words"
          onChangeText={(text) => setFirstName(text)}
          returnKeyType="done"
          onSubmitEditing={signUp}
        />

        <View style={defaultStyles.separator2} />

        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <>
            <TouchableOpacity
              style={defaultStyles.signUpPageCABtn}
              onPress={signUp}
            >
              <Text style={defaultStyles.btnText}>Create an Account</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
