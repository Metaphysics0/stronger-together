import SubmitButton from '@/components/common/SubmitButton';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';
import { SubmitWorkoutService } from '@/services/submit-workout.service';
import { toastError, toastSuccess } from '@/services/toast.service';
import { getAuth } from 'firebase/auth';

export default function SubmitWorkoutButton() {
  const { exercises, setExercises } = useSelectedExercisesStore();
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
      setExercises([]);
      await service.submit({ workout: { exercises } });
    } catch (error) {
      toastError('Error submitting workout 💥');
    }
  }

  return <SubmitButton onSubmit={handleSubmit} />;
}
