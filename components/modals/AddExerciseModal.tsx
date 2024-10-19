import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ExercisePicker } from '../Screens/Workout/WorkoutForm/ExercisePicker';
import { RepsCountPicker } from '../Screens/Workout/WorkoutForm/RepsCountPicker';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';
import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';

interface AddExerciseModalProps {
  closeModal: () => void;
}

export default function AddExerciseModal({
  closeModal,
}: AddExerciseModalProps) {
  const { pushExercise } = useSelectedExercisesStore();
  const { exerciseName, repsCount } = useExerciseStore();
  function handleAddExercise() {
    pushExercise({ exerciseName, count: repsCount });
    closeModal();
  }

  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>Add Exercise</Text>
      <View style={styles.pickerContainer}>
        <ExercisePicker styles={styles.exercisePicker} />
        <RepsCountPicker styles={styles.repsCountPicker} />
      </View>
      <Button title="Add Exercise 🚀" onPress={handleAddExercise} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  exercisePicker: {
    width: '50%',
  },
  repsCountPicker: {
    width: '50%',
  },
  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addExerciseButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
});
