import { StyleSheet } from 'react-native';
import SubmitWorkoutButton from './WorkoutForm/SubmitWorkoutButton';
import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import { ExercisePicker } from './WorkoutForm/ExercisePicker';
import { RepsCountPicker } from './WorkoutForm/RepsCountPicker';

export default function WorkoutContainer() {
  const { exerciseName, setExerciseName, repsCount, setRepsCount } =
    useExerciseStore();

  return (
    <>
      <ExercisePicker value={exerciseName} onValueChange={setExerciseName} />
      <RepsCountPicker
        value={repsCount}
        exerciseName={exerciseName}
        onValueChange={setRepsCount}
        wrapperStyles={styles.repsCountPicker}
      />
      <SubmitWorkoutButton
        workout={{
          exercises: [{ exerciseName, count: repsCount }],
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  repsCountPicker: {
    marginBottom: 40,
  },
});
