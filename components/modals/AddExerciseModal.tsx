import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';
import { ExercisePicker } from '../Screens/Workout/WorkoutForm/ExercisePicker';
import { RepsCountPicker } from '../Screens/Workout/WorkoutForm/RepsCountPicker';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { UserWorkoutExercise } from '@/types/user-workout.type';
import { useAddExerciseModalStore } from '@/hooks/stores/modals/useAddExerciseModalStore';

export default function AddExerciseModal() {
  const { closeModal, userWorkoutExercise } = useAddExerciseModalStore();

  const [formState, setFormState] = useState<UserWorkoutExercise>({
    exerciseName:
      userWorkoutExercise?.exerciseName || Object.values(ExerciseType)[0],
    count: userWorkoutExercise?.count || 1,
  });

  const { pushExercise, updateExerciseAtIndex } = useSelectedExercisesStore();

  function handleAddExercise() {
    if (userWorkoutExercise?.index) {
      updateExerciseAtIndex(userWorkoutExercise.index, formState);
    } else {
      pushExercise(formState);
    }
    closeModal();
  }

  function handleExerciseChange(value: ExerciseType) {
    setFormState((prevState) => ({ ...prevState, exerciseName: value }));
  }

  function handleRepsCountChange(value: number) {
    setFormState((prevState) => ({ ...prevState, count: value }));
  }

  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>
        {userWorkoutExercise ? 'Edit Exercise' : 'Add Exercise'}
      </Text>
      <View style={styles.pickerContainer}>
        <ExercisePicker
          value={formState.exerciseName}
          onValueChange={handleExerciseChange}
          styles={styles.exercisePicker}
        />
        <RepsCountPicker
          value={formState.count}
          exerciseName={formState.exerciseName}
          onValueChange={handleRepsCountChange}
          styles={styles.repsCountPicker}
        />
      </View>
      <TouchableOpacity
        style={styles.addExerciseButton}
        onPress={handleAddExercise}
      >
        <Text style={styles.addExerciseButtonText}>
          {userWorkoutExercise ? 'Edit Exercise' : 'Add Exercise'}
        </Text>
      </TouchableOpacity>
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
    marginTop: 15,
    marginHorizontal: 'auto',
  },
  addExerciseButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007AFF',
  },
});
