import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase/firebase.js'

export default function ChildAdd() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Add</Text>
      <View style={styles.separator} />

      <Pressable style={styles.button} onPress={() => router.replace("/(auth)/child-select")}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>

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

