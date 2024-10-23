import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { UserWorkoutExercise } from '@/types/models/user-workout.type';
import { useAddExerciseModalStore } from '@/hooks/stores/modals/useAddExerciseModalStore';
import { SHARED_STYLES } from '@/constants/shared-styles.constant';
import {
  exerciseTypeToName,
  getRepsCountText,
} from '@/utils/exercise-type-formatter.util';
import { useSharedValue } from 'react-native-reanimated';
import AccordionItem from '../common/AccordionItem';
import { ExercisePicker } from '../Screens/Workout/WorkoutForm/ExercisePicker';
import { RepsCountPicker } from '../Screens/Workout/WorkoutForm/RepsCountPicker';
import AddExerciseModalButton from '../Screens/Workout/WorkoutForm/AddExerciseModalButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddExerciseModal() {
  const { closeModal, userWorkoutExercise } = useAddExerciseModalStore();

  const [formState, setFormState] = useState<UserWorkoutExercise>({
    exerciseName:
      userWorkoutExercise?.exerciseName || Object.values(ExerciseType)[0],
    count: userWorkoutExercise?.count || 1,
    notes: userWorkoutExercise?.notes,
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

  function handleNotesChange(value: string) {
    closeAllPickers();
    setFormState((prevState) => ({ ...prevState, notes: value }));
  }

  const isExercisePickerOpen = useSharedValue(false);
  const isRepsCountPickerOpen = useSharedValue(false);

  function openExercisePicker() {
    isExercisePickerOpen.value = !isExercisePickerOpen.value;
    isRepsCountPickerOpen.value = false;
  }

  function openRepsCountPicker() {
    isRepsCountPickerOpen.value = !isRepsCountPickerOpen.value;
    isExercisePickerOpen.value = false;
  }

  function closeAllPickers() {
    isExercisePickerOpen.value = false;
    isRepsCountPickerOpen.value = false;
    Keyboard.dismiss();
  }

  return (
    <TouchableOpacity
      style={styles.modalContent}
      onPress={closeAllPickers}
      activeOpacity={1}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          {userWorkoutExercise ? 'Edit Exercise' : 'Add Exercise'}
        </Text>
        <TouchableOpacity onPress={closeModal}>
          <MaterialCommunityIcons
            name="close-circle"
            size={24}
            color="#e1e1e3"
          />
        </TouchableOpacity>
      </View>
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

        <View style={styles.formRowContainer}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Count</Text>
            <TouchableOpacity
              style={styles.inlinePickerInputLabel}
              onPress={() => openRepsCountPicker()}
            >
              <Text style={styles.inlinePickerInputText}>
                {getRepsCountText({
                  exerciseName: formState.exerciseName,
                  count: formState.count,
                }) || 'Select Count'}
              </Text>
            </TouchableOpacity>
          </View>
          <AccordionItem
            // @ts-ignore
            isExpanded={isRepsCountPickerOpen}
            viewKey="repsCountPicker"
          >
            {isRepsCountPickerOpen && (
              <View style={{ width: '100%' }}>
                <RepsCountPicker
                  value={formState.count}
                  exerciseName={formState.exerciseName}
                  onValueChange={handleRepsCountChange}
                />
              </View>
            )}
          </AccordionItem>
        </View>

        <View style={styles.formRowContainer}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Notes</Text>
            <TextInput
              value={formState.notes}
              onFocus={() => closeAllPickers()}
              onChangeText={handleNotesChange}
              placeholder="Optional notes for this exercise"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addExerciseButton}
        onPress={handleAddExercise}
      >
        <AddExerciseModalButton
          buttonPrefixText={userWorkoutExercise ? 'Edit' : 'Add'}
          onPress={handleAddExercise}
          buttonStyles={styles.addExerciseButton}
          buttonTextStyles={styles.addExerciseButtonText}
        />
      </TouchableOpacity>
    </TouchableOpacity>
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  repsCountPicker: {
    width: '50%',
  },
  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addExerciseButton: {
    marginTop: 5,
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
    paddingVertical: 8,
  },
  inlinePickerInputText: {
    fontSize: 16,
    color: '#363638',
  },
});
