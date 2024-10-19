import { getUserOrThrow, updateUser } from './db.service';

import { UserWorkoutExercise } from '@/types/user-workout.type';
import { StrongerTogetherDbUser } from '@/types/stronger-together-user.type';
import { sendPushNotificationToAllUsers } from './push-notifications/send-push-notification.service';
import { getWorkoutPushNotificationMessageV2 } from '@/utils/get-workout-push-notification-message-v2.util';

export class SubmitWorkoutService {
  private userUid: string;
  constructor({ userUid }: { userUid: string }) {
    this.userUid = userUid;
  }

  async submit({ exercises }: { exercises: UserWorkoutExercise[] }) {
    const user = await getUserOrThrow({ uid: this.userUid });
    const workoutsToSubmit = this.getWorkoutsToSubmit({ user, exercises });
    await updateUser({
      uid: this.userUid,
      data: { workouts: workoutsToSubmit },
    });

    await this.sendPushNotification({ user, exercises });
  }

  private async sendPushNotification({
    user,
    exercises,
  }: {
    user: StrongerTogetherDbUser;
    exercises: UserWorkoutExercise[];
  }) {
    const { title: notificationTitle, body: notificationBody } =
      getWorkoutPushNotificationMessageV2({
        userDisplayName: user.displayName,
        exercises,
      });

    await sendPushNotificationToAllUsers({
      currentUserUid: this.userUid,
      title: notificationTitle,
      body: notificationBody,
    });
  }

  private getWorkoutsToSubmit({
    user,
    exercises,
  }: {
    user: StrongerTogetherDbUser;
    exercises: UserWorkoutExercise[];
  }) {
    const { workouts: existingWorkouts = [] } = user;
    const workout = { exercises, timestamp: new Date() };
    return [...existingWorkouts, workout];
  }
}
