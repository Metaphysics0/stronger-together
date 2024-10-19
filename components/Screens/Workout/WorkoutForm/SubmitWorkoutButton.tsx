import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';
import { SubmitWorkoutService } from '@/services/submit-workout.service';
import { toastError, toastSuccess } from '@/services/toast.service';
import { getAuth } from 'firebase/auth';
import { Button, StyleSheet } from 'react-native';

export default function SubmitWorokoutButton() {
  const { exercises } = useSelectedExercisesStore();
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
      await service.submit({ workout: { exercises } });
    } catch (error) {
      toastError('Error submitting workout 💥');
    }
  }

  return <Button onPress={handleSubmit} title="Submit 🚀" />;
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
