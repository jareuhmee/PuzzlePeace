import { StyleSheet, TextInput, View } from 'react-native';

export default function NewEntry() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} multiline numberOfLines={4} placeholder='Add note...' />
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
  input: {
    marginVertical: 4,
    width: 300,
    height: 200,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 20,
    fontFamily: 'DMSans'
  }
});

