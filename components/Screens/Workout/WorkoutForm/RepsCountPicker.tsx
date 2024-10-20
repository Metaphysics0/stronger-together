import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { getRepsCountText } from '@/utils/exercise-type-formatter.util';
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
  return (
    <Picker
      selectedValue={initialValue || repsCount}
      onValueChange={setSelectedRepsCount}
      style={styles}
    >
      {Array.from({ length: maxRepsCount }, (_, index) => {
        const count = index + 1;
        return (
          <Picker.Item
            key={count}
            label={getRepsCountText({ exerciseName, count })}
            value={count}
          />
        );
      })}
    </Picker>
  );
}
