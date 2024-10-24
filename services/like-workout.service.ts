import {
  findMatchingWorkoutFromUser,
  MatchingUserWorkout,
} from '@/utils/find-matching-workout-from-user.util';
import { StrongerTogetherDbUser } from '@/types/models/stronger-together-user.type';
import { UserWorkout } from '@/types/models/user-workout.type';
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export class LikeWorkoutService {
  async likeOrUnlikeWorkout({
    workout,
    workoutOwnerUser,
    currentUserId,
  }: {
    workout: UserWorkout;
    workoutOwnerUser: StrongerTogetherDbUser;
    currentUserId: string;
  }) {
    const matchingWorkout = findMatchingWorkoutFromUser({
      workout,
      user: workoutOwnerUser,
    });
    if (!matchingWorkout) return;

    const hasCurrentUserLikedWorkout = this.hasCurrentUserLikedWorkout({
      workout,
      currentUserId,
    });

    // TEST THE DB UPDATES + FIRESTORE OUTPUT
    hasCurrentUserLikedWorkout
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

    const userRef = doc(db, 'users', workoutOwnerUser.uid);
    await updateDoc(userRef, {
      [`workouts.${matchingWorkout.index}.likedUserIds`]:
        arrayRemove(currentUserId),
    });
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

    const userRef = doc(db, 'users', workoutOwnerUser.uid);
    const batch = writeBatch(db);

    batch.update(userRef, {
      [`workouts.${matchingWorkout.index}.likedUserIds`]:
        arrayUnion(currentUserId),
    });

    await batch.commit();
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
