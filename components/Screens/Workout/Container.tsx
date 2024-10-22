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
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  exerciseContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '50%',
  },
  scrollViewContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '60%',
    paddingHorizontal: 16,
  },
  submitButtonContainer: {
    width: '35%',
    marginHorizontal: 'auto',
  },
  modalHandle: {
    backgroundColor: '#ccc',
    width: 60,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
});
