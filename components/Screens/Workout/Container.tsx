import { ExercisePicker } from '@/components/Screens/Workout/WorkoutForm/ExercisePicker';
import { RepsCountPicker } from '@/components/Screens/Workout/WorkoutForm/RepsCountPicker';
import { SubmitWorkoutButton } from '@/components/Screens/Workout/WorkoutForm/SubmitWorkoutButton';
import { View } from 'react-native';

export default function WorkoutContainer() {
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
