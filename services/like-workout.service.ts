import {
  findMatchingWorkoutFromUser,
  MatchingUserWorkout,
} from '@/utils/find-matching-workout-from-user.util';
import { StrongerTogetherDbUser } from '@/types/models/stronger-together-user.type';
import { UserWorkout } from '@/types/models/user-workout.type';
import { updateUser } from './db.service';
import { uniq } from 'lodash';

export class LikeWorkoutService {
  async likeOrUnlikeWorkout({
    workout,
    workoutOwnerUser,
    currentUserId,
  }: {
    workout: UserWorkout;
    workoutOwnerUser: StrongerTogetherDbUser;
    currentUserId: string;
  }): Promise<UserWorkout[]> {
    const matchingWorkout = findMatchingWorkoutFromUser({
      workout,
      user: workoutOwnerUser,
    });
    if (!matchingWorkout) {
      throw new Error('No matching workout found');
    }

    const hasCurrentUserLikedWorkout = this.hasCurrentUserLikedWorkout({
      workout,
      currentUserId,
    });

    return hasCurrentUserLikedWorkout
      ? await this.unlike({ workoutOwnerUser, matchingWorkout, currentUserId })
      : await this.like({ workoutOwnerUser, matchingWorkout, currentUserId });
  }

  private async unlike({
    workoutOwnerUser,
    matchingWorkout,
    currentUserId,
  }: {
    workoutOwnerUser: StrongerTogetherDbUser;
    matchingWorkout: MatchingUserWorkout;
    currentUserId: string;
  }) {
    this.logUpdate({ workoutOwnerUser, currentUserId, action: 'unlike' });

    const updatedWorkouts = this.getUpdatedWorkouts({
      workoutOwnerUser,
      matchingWorkout,
      currentUserId,
      action: 'unlike',
    });

    await updateUser({
      uid: workoutOwnerUser.uid,
      data: { workouts: updatedWorkouts },
    });

    return updatedWorkouts;
  }

  private async like({
    workoutOwnerUser,
    matchingWorkout,
    currentUserId,
  }: {
    workoutOwnerUser: StrongerTogetherDbUser;
    matchingWorkout: MatchingUserWorkout;
    currentUserId: string;
  }) {
    this.logUpdate({ workoutOwnerUser, currentUserId, action: 'like' });

    const updatedWorkouts = this.getUpdatedWorkouts({
      workoutOwnerUser,
      matchingWorkout,
      currentUserId,
      action: 'like',
    });

    await updateUser({
      uid: workoutOwnerUser.uid,
      data: { workouts: updatedWorkouts },
    });

    console.log(
      'LIKED UPDATED WORKOUTS',
      JSON.stringify(updatedWorkouts, null, 2)
    );

    return updatedWorkouts;
  }

  private hasCurrentUserLikedWorkout({
    workout,
    currentUserId,
  }: {
    workout: UserWorkout;
    currentUserId: string;
  }) {
    return (workout.likedUserIds || []).includes(currentUserId);
  }

  private getUpdatedWorkouts({
    workoutOwnerUser,
    matchingWorkout,
    currentUserId,
    action,
  }: {
    workoutOwnerUser: StrongerTogetherDbUser;
    matchingWorkout: MatchingUserWorkout;
    currentUserId: string;
    action: 'like' | 'unlike';
  }) {
    const likedUserIds =
      action === 'like'
        ? this.arrayUnion(matchingWorkout.workout.likedUserIds, currentUserId)
        : this.arrayRemove(matchingWorkout.workout.likedUserIds, currentUserId);

    const workoutWithUpdatedLikedUserIds = {
      ...matchingWorkout.workout,
      likedUserIds,
    };

    return workoutOwnerUser.workouts.map((workout, index) =>
      index === matchingWorkout.index ? workoutWithUpdatedLikedUserIds : workout
    );
  }

  private arrayUnion = (array: string[] | undefined, value: string) =>
    array ? uniq([...array, value]) : [value];

  private arrayRemove = (array: string[] | undefined, value: string) =>
    array ? array.filter((id) => id !== value) : [];

  private logUpdate({
    workoutOwnerUser,
    currentUserId,
    action,
  }: {
    workoutOwnerUser: StrongerTogetherDbUser;
    currentUserId: string;
    action: 'like' | 'unlike';
  }) {
    console.log(
      `LikeWorkoutService - ${action} workout from user ${workoutOwnerUser.uid} for user ${currentUserId}`
    );
  }
}
