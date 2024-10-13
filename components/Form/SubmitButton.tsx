import { Pressable, StyleSheet, Text } from 'react-native';

export function SubmitButton() {
  const handleSubmit = () => {
    console.log('Submit');
  };
  return (
    <Pressable style={styles.button} onPress={handleSubmit}>
      <Text style={styles.text}>🚀</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 45,
  },
});
