import { StrongerTogetherDbUser } from '@/types/models/stronger-together-user.type';
import { UserWorkout } from '@/types/models/user-workout.type';

export function findMatchingWorkoutFromUser({
  workout,
  user,
}: {
  workout: UserWorkout;
  user: StrongerTogetherDbUser;
}): MatchingUserWorkout | undefined {
  try {
    const index = user.workouts.findIndex(
      (userWorkout) =>
        userWorkout.timestamp.toMillis() === workout.timestamp.toMillis()
    );
    if (index === -1) return undefined;

    return {
      workout: user.workouts[index],
      index,
    };
  } catch (error) {
    console.error('Error finding matching workout:', error);
    return undefined;
  }
}
export type MatchingUserWorkout = {
  workout: UserWorkout;
  index: number;
};
