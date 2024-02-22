import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase/firebase.js'

export default function Home() {
  return ( <>
  
    <View style={styles.container}>
      {/* <Text style={styles.title}>Reports</Text> */}
      <View style={styles.separator} />

      

    </View>

    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => router.navigate("/(modals)/new-entry")}>
        <Text style={styles.plus}>➕</Text>
      </Pressable>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#76B18F'
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#76B18F'
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
    height: 60,
    width: 60,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: '#ffffff'
    
  },
  plus: {
    fontSize: 32,
    fontFamily:'DMSans'
  },
  text: {
    fontSize: 12,
    fontFamily:'DMSans'
  }
});

