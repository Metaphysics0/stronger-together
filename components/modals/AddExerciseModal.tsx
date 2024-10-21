import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { UserWorkoutExercise } from '@/types/user-workout.type';
import { useAddExerciseModalStore } from '@/hooks/stores/modals/useAddExerciseModalStore';
import { SHARED_STYLES } from '@/constants/shared-styles.constant';
import { exerciseTypeToName } from '@/utils/exercise-type-formatter.util';
import { useSharedValue } from 'react-native-reanimated';
import AccordionItem from '../common/AccordionItem';
import { ExercisePicker } from '../Screens/Workout/WorkoutForm/ExercisePicker';

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

  const isExercisePickerOpen = useSharedValue(false);
  const isRepsCountPickerOpen = useSharedValue(false);

  function toggleExercisePicker() {}

  function openExercisePicker() {
    isExercisePickerOpen.value = !isExercisePickerOpen.value;
    console.log('openExercisePicker');
  }

  function openRepsCountPicker() {
    console.log('openRepsCountPicker');
  }

  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>
        {userWorkoutExercise ? 'Edit Exercise' : 'Add Exercise'}
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.formRowContainer}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Exercise</Text>
            <TouchableOpacity
              style={styles.inlinePickerInputLabel}
              onPress={() => openExercisePicker()}
            >
              <Text style={styles.inlinePickerInputText}>
                {exerciseTypeToName[formState.exerciseName] || 'Select Reps'}
              </Text>
            </TouchableOpacity>
          </View>
          <AccordionItem
            // @ts-ignore
            isExpanded={isExercisePickerOpen}
            viewKey="exercisePicker"
          >
            {isExercisePickerOpen && (
              <View style={{ width: '100%' }}>
                <ExercisePicker
                  value={formState.exerciseName}
                  onValueChange={handleExerciseChange}
                />
              </View>
            )}
          </AccordionItem>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Count</Text>
          <TouchableOpacity
            style={styles.inlinePickerInputLabel}
            onPress={() => openRepsCountPicker()}
          >
            <Text style={styles.inlinePickerInputText}>
              {formState.count || 'Select Reps'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.pickerContainer}>
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
      </View> */}
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
    marginBottom: 10,
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formRow: SHARED_STYLES.formRowWithoutBorder,
  formRowContainer: {
    display: 'flex',
    flexDirection: 'column',
    ...SHARED_STYLES.formRowBorder,
  },
  formLabel: SHARED_STYLES.formLabel,
  inlinePickerInputLabel: {
    backgroundColor: '#e1e1e3',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inlinePickerInputText: {
    fontSize: 16,
    color: '#363638',
  },
});
