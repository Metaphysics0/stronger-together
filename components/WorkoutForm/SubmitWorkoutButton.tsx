import { usePushNotificationStore } from '@/hooks/stores/usePushNotificationStore';
import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import { submitWorkout } from '@/services/submit-workout.service';
import { toastError, toastSuccess } from '@/services/toast.service';
import { isExerciseType } from '@/types/guards/is-exercise-type.guard';
import { getWorkoutSubmitToastMessage } from '@/utils/get-workout-submit-toast-message.util';
import { getAuth } from 'firebase/auth';
import { Pressable, StyleSheet, Text } from 'react-native';

export function SubmitWorkoutButton() {
  const { exerciseName: exercise, repsCount } = useExerciseStore();
  const { expoPushToken } = usePushNotificationStore();
  const auth = getAuth();

  async function handleSubmit() {
    if (!auth.currentUser) {
      console.error('User is not logged in');
      return;
    }

    if (!isExerciseType(exercise)) {
      throw new Error('Invalid exercise!');
    }

    if (!expoPushToken) {
      throw new Error('No push notification token found');
    }

    toastSuccess(getWorkoutSubmitToastMessage({ exercise, repsCount }));
    try {
      await submitWorkout({
        exercise,
        count: repsCount,
        currentUserUid: auth.currentUser.uid,
      });
    } catch (error) {
      console.error('Error submitting workout', error);
      toastError('Error submitting workout');
    }
  }

  return (
    <Pressable style={styles.button} onPress={handleSubmit}>
      <Text style={styles.text}>🚀</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 45,
  },
});
