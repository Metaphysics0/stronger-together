import { AVAILABLE_EXERCISES } from '@/constants/available-exercises.constant';
import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import { Picker } from '@react-native-picker/picker';

export function ExercisePicker() {
  const { exerciseName, setExerciseName } = useExerciseStore();

  return (
    <Picker selectedValue={exerciseName} onValueChange={setExerciseName}>
      {AVAILABLE_EXERCISES.map((exercise) => (
        <Picker.Item
          key={exercise.value}
          label={exercise.name}
          value={exercise.value}
        />
      ))}
    </Picker>
  );
}
