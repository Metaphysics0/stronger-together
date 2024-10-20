import { TouchableOpacity, Text, StyleSheet } from 'react-native';

/*
 * This button opens the Modalize modal
 */

export default function AddExerciseButton({ onOpen }: { onOpen: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onOpen}>
      <Text style={styles.buttonText}>Add Exercise</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#dddddd',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333',
  },
});
