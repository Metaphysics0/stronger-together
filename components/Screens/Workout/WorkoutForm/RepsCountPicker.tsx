import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { getRepsCountText } from '@/utils/exercise-type-formatter.util';
import { exerciseTypeToMaxRepsCount } from '@/utils/exercise-type-formatter.util';
import { Picker } from '@react-native-picker/picker';
interface RepsCountPickerProps {
  styles?: Record<string, any>;
  value: number;
  exerciseName: ExerciseType;
  onValueChange: (value: number) => void;
}
export function RepsCountPicker({
  styles = {},
  exerciseName,
  value,
  onValueChange,
}: RepsCountPickerProps) {
  const maxRepsCount = exerciseTypeToMaxRepsCount[exerciseName as ExerciseType];
  return (
    <Picker selectedValue={value} onValueChange={onValueChange} style={styles}>
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
