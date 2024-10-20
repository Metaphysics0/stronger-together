import { AVAILABLE_EXERCISES } from '@/constants/available-exercises.constant';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { Picker } from '@react-native-picker/picker';
interface ExercisePickerProps {
  styles?: Record<string, any>;
  value: ExerciseType;
  onValueChange: (value: ExerciseType) => void;
}
export function ExercisePicker({
  styles = {},
  value,
  onValueChange,
}: ExercisePickerProps) {
  return (
    <Picker selectedValue={value} onValueChange={onValueChange} style={styles}>
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
