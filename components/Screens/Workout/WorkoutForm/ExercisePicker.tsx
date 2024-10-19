import { AVAILABLE_EXERCISES } from '@/constants/available-exercises.constant';
import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { Picker } from '@react-native-picker/picker';

interface ExercisePickerProps {
  styles?: Record<string, any>;
  initialValue?: ExerciseType;
}

export function ExercisePicker({
  styles = {},
  initialValue,
}: ExercisePickerProps) {
  const { exerciseName, setExerciseName } = useExerciseStore();

  return (
    <Picker
      selectedValue={initialValue || exerciseName}
      onValueChange={setExerciseName}
      style={styles}
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
