import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AddExerciseButton({ onOpen }: { onOpen: () => void }) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onOpen}>
      <Text style={styles.addButtonText}>Add Exercise</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
