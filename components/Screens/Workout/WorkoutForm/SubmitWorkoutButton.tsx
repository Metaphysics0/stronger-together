import { SubmitWorkoutService } from '@/services/submit-workout.service';
import { toastError, toastSuccess } from '@/services/toast.service';
import { UserWorkout } from '@/types/models/user-workout.type';
import { getAuth } from 'firebase/auth';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SubmitWorkoutButton({
  workout,
}: {
  workout: Omit<UserWorkout, 'timestamp'>;
}) {
  const auth = getAuth();

  async function handleSubmit() {
    try {
      if (!auth.currentUser) {
        toastError('You must be logged in to submit a workout');
        return;
      }
      const service = new SubmitWorkoutService({
        userUid: auth.currentUser.uid,
      });
      toastSuccess('Workout submitted, great job!');
      await service.submit({
        workout: { ...workout, timestamp: new Date() },
      });
    } catch (error) {
      toastError('Error submitting workout 💥');
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>🚀</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 'auto',
  },
  buttonText: {
    fontSize: 45,
  },
});
