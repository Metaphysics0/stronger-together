import { getUserOrThrow, updateUser } from './db.service';

import { UserWorkoutExercise } from '@/types/user-workout.type';
import { StrongerTogetherDbUser } from '@/types/stronger-together-user.type';
import { sendPushNotificationToAllUsers } from './push-notifications/send-push-notification.service';
import { getWorkoutPushNotificationMessage } from '@/utils/get-workout-push-notification-message.util';

export class SubmitWorkoutService {
  private userUid: string;
  constructor({ userUid }: { userUid: string }) {
    this.userUid = userUid;
  }

  async submit({ workout }: { workout: { exercises: UserWorkoutExercise[] } }) {
    try {
      console.log(
        'SubmitWorkoutService - Submitting workout for user',
        this.userUid
      );
      const { exercises } = workout;
      const user = await getUserOrThrow({ uid: this.userUid });
      await updateUser({
        uid: this.userUid,
        data: this.getUpdateUserPayload({ user, exercises }),
      });

      await this.sendPushNotification({ user, exercises });
    } catch (error) {
      console.error('SubmitWorkoutService - Error submitting workout', error);
      throw error;
    }
  }

  private async sendPushNotification({
    user,
    exercises,
  }: {
    user: StrongerTogetherDbUser;
    exercises: UserWorkoutExercise[];
  }) {
    const { title: notificationTitle, body: notificationBody } =
      getWorkoutPushNotificationMessage({
        userDisplayName: user.displayName,
        exercises,
      });

    await sendPushNotificationToAllUsers({
      currentUserUid: this.userUid,
      title: notificationTitle,
      body: notificationBody,
    });
  }

  private getUpdateUserPayload({
    user,
    exercises,
  }: {
    user: StrongerTogetherDbUser;
    exercises: UserWorkoutExercise[];
  }): Partial<StrongerTogetherDbUser> {
    const { workouts: existingWorkouts = [] } = user;
    const workout = { exercises, timestamp: new Date() };
    return {
      workouts: [...existingWorkouts, workout],
    };
  }
}

// type SubmitWorkoutRequest
