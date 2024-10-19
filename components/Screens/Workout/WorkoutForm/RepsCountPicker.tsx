import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { exerciseTypeToRepCountSuffix } from '@/utils/exercise-type-formatter.util';
import { exerciseTypeToMaxRepsCount } from '@/utils/exercise-type-formatter.util';
import { Picker } from '@react-native-picker/picker';
interface RepsCountPickerProps {
  styles?: Record<string, any>;
  initialValue?: number;
}
export function RepsCountPicker({
  styles = {},
  initialValue,
}: RepsCountPickerProps) {
  const { repsCount, exerciseName, setRepsCount } = useExerciseStore();
  function setSelectedRepsCount(itemValue: number): void {
    setRepsCount(Number(itemValue));
  }
  const maxRepsCount = exerciseTypeToMaxRepsCount[exerciseName as ExerciseType];
  const suffix =
    exerciseTypeToRepCountSuffix[exerciseName as ExerciseType] ?? '';
  return (
    <Picker
      selectedValue={initialValue || repsCount}
      onValueChange={setSelectedRepsCount}
      style={styles}
    >
      {Array.from({ length: maxRepsCount }, (_, index) => (
        <Picker.Item
          key={index + 1}
          label={`${index + 1} ${suffix}`}
          value={index + 1}
        />
      ))}
    </Picker>
  );
}