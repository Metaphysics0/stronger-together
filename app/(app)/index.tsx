import { ExercisePicker } from '@/components/WorkoutForm/ExercisePicker';
import { RepsCountPicker } from '@/components/WorkoutForm/RepsCountPicker';
import { SubmitWorkoutButton } from '@/components/WorkoutForm/SubmitWorkoutButton';
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
