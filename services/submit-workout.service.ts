import { getUserOrThrow, updateUser } from './db.service';

import {
  UserWorkout,
  UserWorkoutExercise,
} from '@/types/models/user-workout.type';
import { StrongerTogetherDbUser } from '@/types/models/stronger-together-user.type';
import { sendPushNotificationToAllUsers } from './push-notifications/send-push-notification.service';
import { getWorkoutPushNotificationMessage } from '@/utils/get-workout-push-notification-message.util';
import { Timestamp } from 'firebase/firestore';

export class SubmitWorkoutService {
  private userUid: string;
  constructor({ userUid }: { userUid: string }) {
    this.userUid = userUid;
  }

  async submit({ workout }: { workout: UserWorkout }) {
    try {
      console.log(
        'SubmitWorkoutService - Submitting workout for user',
        this.userUid
      );
      const user = await getUserOrThrow({ uid: this.userUid });
      await updateUser({
        uid: this.userUid,
        data: this.getUpdateUserPayload({ user, workout }),
      });

      await this.sendPushNotification({ user, exercises: workout.exercises });
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
    workout,
  }: {
    user: StrongerTogetherDbUser;
    workout: UserWorkout;
  }): Partial<StrongerTogetherDbUser> {
    const { workouts: existingWorkouts = [] } = user;
    const workoutToAdd: StrongerTogetherDbUser['workouts'][number] = {
      exercises: workout.exercises,
      timestamp: Timestamp.now(),
      notes: workout?.notes || '',
    };
    return {
      workouts: [...existingWorkouts, workoutToAdd],
    };
  }
}
