import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PuzzlePeace</Text>
      <View style={styles.separator} />
      <Link href="/(tabs)/journal">Login</Link>
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

