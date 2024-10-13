import { AVAILABLE_EXERCISES } from '@/constants/available-exercises.constant';
import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import { ExerciseType } from '@/types/exercise.type';
import { Picker } from '@react-native-picker/picker';

export function ExercisePicker() {
  const { exerciseName, setExerciseName } = useExerciseStore();

  function setSelectedExercise(itemValue: string): void {
    setExerciseName(itemValue as ExerciseType);
  }

  return (
    <Picker
      selectedValue={exerciseName}
      onValueChange={(itemValue) => setSelectedExercise(itemValue)}
    >
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
