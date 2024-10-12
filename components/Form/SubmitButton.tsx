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
    padding: 10,
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
  },
});
