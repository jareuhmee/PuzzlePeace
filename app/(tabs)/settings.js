import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase/firebase.js'

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} />

      <Pressable style={styles.button} onPress={() => auth.signOut()}>
        <Text style={styles.text}>Logout</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'DMSans'
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
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

