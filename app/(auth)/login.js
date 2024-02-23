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
import { signInWithEmailAndPassword } from "@firebase/auth";
import { defaultStyles } from "../../constants/Styles.js";

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
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Login</Text>
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
          <TouchableOpacity style={defaultStyles.btn} onPress={signIn}>
            <Text style={defaultStyles.btnText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
