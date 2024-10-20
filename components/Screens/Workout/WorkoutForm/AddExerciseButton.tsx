import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function AddExerciseButton({ onOpen }: { onOpen: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onOpen}>
      <FontAwesome name="plus-circle" size={20} color="#007AFF" />
      <Text style={styles.buttonText}>Add Exercise</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.75,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 5,
    color: '#007AFF',
    // color: '#000000',
  },
});
