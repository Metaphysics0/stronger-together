import { AVAILABLE_EXERCISES } from '@/constants/available-exercises.constant';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export function ExercisePicker() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  return (
    <Picker
      selectedValue={selectedExercise}
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
