import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { auth } from "../../firebase/firebase.js";
import { sendPasswordResetEmail } from "@firebase/auth";
import { defaultStyles } from "../../constants/Styles.js";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfinity } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "expo-router";

export default function PasswordReset() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const sendResetEmail = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      console.log(error);
      alert("Password reset failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={defaultStyles.container}>
        
      {!resetSent ? (
        <>
          <FontAwesomeIcon icon={faInfinity} style={defaultStyles.iconOnLogin} size={70}/>
          <Text style={defaultStyles.loginPageLogIn}>Reset Password</Text>
          <View style={defaultStyles.separator} />

          <TextInput
            style={defaultStyles.input}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />

          <View style={defaultStyles.separator2} />

          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <TouchableOpacity style={defaultStyles.loginPageLoginBtn} onPress={sendResetEmail}>
              <Text style={defaultStyles.btnText}>Send Reset Email</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
        <Text style={defaultStyles.resetPassBtn}>Reset email sent! Please check your inbox.</Text>
        <TouchableOpacity style={defaultStyles.loginPageLoginBtn} onPress={goToLogin}>
            <Text style={defaultStyles.btnText}>Return to Login</Text>
        </TouchableOpacity>
        </>
      )}
    </View>
  );
}

