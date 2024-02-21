import { Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PuzzlePeace</Text>
      <View style={styles.separator} />

      <Link href="/(modals)/login" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </Link>

      <Link href="/(modals)/register" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>
      </Link>

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
