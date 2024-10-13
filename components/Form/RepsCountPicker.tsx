import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import { Picker } from '@react-native-picker/picker';

export function RepsCountPicker() {
  const { repsCount, setRepsCount } = useExerciseStore();

  function setSelectedRepsCount(itemValue: number): void {
    setRepsCount(Number(itemValue));
  }

  return (
    <Picker selectedValue={repsCount} onValueChange={setSelectedRepsCount}>
      {Array.from({ length: 100 }, (_, index) => (
        <Picker.Item
          key={index + 1}
          label={(index + 1).toString()}
          value={index + 1}
        />
      ))}
    </Picker>
  );
}
