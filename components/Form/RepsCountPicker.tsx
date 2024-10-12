import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export function RepsCountPicker() {
  const [selectedRepsCount, setSelectedRepsCount] = useState<number>(1);
  return (
    <Picker
      selectedValue={selectedRepsCount}
      onValueChange={(itemValue) => setSelectedRepsCount(itemValue)}
    >
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
