import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { app } from '../firebase/firebase.js'

export default function LandingPage() {
  const handleLoginPress = () => {
    // Log Firebase app information when the login button is pressed
    console.log('Firebase app:', app);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PuzzlePeace</Text>
      <View style={styles.separator} />
      {/* Adding onPress handler to the Link component */}
      <Link href="/(tabs)/journal" onPress={handleLoginPress}>Login</Link>
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
    fontSize: 36,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
});

