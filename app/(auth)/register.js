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
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { defaultStyles } from "../../constants/Styles.js";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.replace("/(auth)/child-add");
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Sign Up</Text>
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
          <TouchableOpacity style={defaultStyles.btn} onPress={signUp}>
            <Text style={defaultStyles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
