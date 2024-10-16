import { ExercisePicker } from '@/components/Form/ExercisePicker';
import { RepsCountPicker } from '@/components/Form/RepsCountPicker';
import { SubmitWorkoutButton } from '@/components/Form/SubmitWorkoutButton';
import { View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 35,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <ExercisePicker />
      <RepsCountPicker />
      <SubmitWorkoutButton />
    </View>
  );
}
