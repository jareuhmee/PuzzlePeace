import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, View, Pressable, ActivityIndicator } from 'react-native';
import { auth } from '../../firebase/firebase.js'
import { createUserWithEmailAndPassword } from '@firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  const signUp = async () => {
    setLoading(true);
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
    } 
    catch (error) {
        console.log(error);
        alert('Sign up failed: ' + error.message);
    } 
    finally {
        setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.separator} />

      <TextInput style={styles.input} value={email} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
      <TextInput style={styles.input} secureTextEntry={true} value={password} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} />

      <View style={styles.separator} />

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <> 
          <Pressable style={styles.button} onPress={signUp}>
            <Text style={styles.text}>Sign Up</Text>
          </Pressable>
        </>
      )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#76B18F'
  },
  title: {
    fontSize: 36,
    fontFamily: 'DMSans'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    height: 50,
    width: 200,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#ffffff'
    
  },
  text: {
    fontSize: 16,
    fontFamily:'DMSans'
  }
});
