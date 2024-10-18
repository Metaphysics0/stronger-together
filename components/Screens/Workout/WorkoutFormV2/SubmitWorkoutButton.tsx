import { Button, StyleSheet } from 'react-native';

export default function SubmitWorokoutButton() {
  const handleSubmit = () => {
    console.log('submit');
  };

  return <Button onPress={handleSubmit} title="Submit 🚀" />;
  // <TouchableOpacity style={styles.container} onPress={handleSubmit}>
  //   <Text style={styles.text}>Submit</Text>
  // </TouchableOpacity>
  // );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
