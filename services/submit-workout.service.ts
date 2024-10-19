import { UserWorkout } from '@/types/user-workout.type';
import { sendPushNotificationToAllUsers } from './push-notifications/send-push-notification.service';
import { getUser, updateUser } from './db.service';
import { getWorkoutPushNotificationMessageParams } from '@/utils/get-workout-push-notification-message.util';
import { toastError } from './toast.service';
import { ExerciseType } from '@/types/enums/exercise-type.enum';

export async function submitWorkout({
  currentUserUid,
  exercise,
  count,
}: {
  currentUserUid: string;
  exercise: ExerciseType;
  count: number;
}) {
  try {
    console.log(
      `submitting workout for user: ${currentUserUid} - ${count} ${exercise}`
    );

    const user = await getUser({ uid: currentUserUid });
    if (!user) throw new Error('User not found');

    const { workouts: existingWorkouts = [] } = user;

    const workout: UserWorkout = { exercise, count, timestamp: new Date() };

    await updateUser({
      uid: currentUserUid,
      data: { workouts: [...existingWorkouts, workout] },
    });

    const { title, body } = getWorkoutPushNotificationMessageParams({
      userDisplayName: user.displayName,
      exercise,
      count,
    });

    await sendPushNotificationToAllUsers({ currentUserUid, title, body });
  } catch (error) {
    console.error('error submitting workout', error);
    toastError('Error submitting workout');
  }
}
