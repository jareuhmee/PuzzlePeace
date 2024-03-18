import { useState } from "react";
import { router } from "expo-router";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { auth } from "../../firebase/firebase.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "@firebase/auth";
import { defaultStyles } from "../../constants/Styles.js";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfinity } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message + " Please enter a valid email and password.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.log(error);
      alert("Failed to send password reset email: " + error.message + " Please enter a valid email address in the designated area.");
    }
  };

  return (
    <View style={defaultStyles.container}>
      <FontAwesomeIcon icon={faInfinity} style={defaultStyles.iconOnLogin} size={70}/>
      <Text style={defaultStyles.loginPageLogIn}>Log In</Text>
      <View style={defaultStyles.separator} />

      <TextInput
        style={defaultStyles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={defaultStyles.input}
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />

      <View style={defaultStyles.separator} />

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <TouchableOpacity style={defaultStyles.loginPageLoginBtn} onPress={signIn}>
            <Text style={defaultStyles.btnText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetPassword}>
            <Text style={defaultStyles.loginPageForgotBtn}>Forgot Password?</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
