import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import {
  ExerciseType,
  exerciseTypeToMaxRepsCount,
} from '@/types/exercise.type';
import { Picker } from '@react-native-picker/picker';

export function RepsCountPicker() {
  const { repsCount, exerciseName, setRepsCount } = useExerciseStore();

  function setSelectedRepsCount(itemValue: number): void {
    setRepsCount(Number(itemValue));
  }

  const maxRepsCount = exerciseTypeToMaxRepsCount[exerciseName as ExerciseType];

  return (
    <Picker selectedValue={repsCount} onValueChange={setSelectedRepsCount}>
      {Array.from({ length: maxRepsCount }, (_, index) => (
        <Picker.Item
          key={index + 1}
          label={(index + 1).toString()}
          value={index + 1}
        />
      ))}
    </Picker>
  );
}
