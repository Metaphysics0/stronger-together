import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LikeWorkoutService } from '@/services/like-workout.service';
import { UserWorkout } from '@/types/models/user-workout.type';
import { StrongerTogetherDbUser } from '@/types/models/stronger-together-user.type';

export const useLikeMutation = (
  currentUserId: string | null,
  users: StrongerTogetherDbUser[] | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      workout,
      workoutOwnerUserId,
    }: {
      workout: UserWorkout;
      workoutOwnerUserId: string;
    }) => {
      if (!currentUserId) {
        throw new Error('No current user id in session');
      }

      const workoutOwnerUser = users?.find((u) => u.uid === workoutOwnerUserId);
      if (!workoutOwnerUser) {
        throw new Error('No workout owner user found');
      }

      const likeWorkoutService = new LikeWorkoutService();
      return likeWorkoutService.likeOrUnlikeWorkout({
        workout,
        workoutOwnerUser,
        currentUserId,
      });
    },
    onSuccess: (updatedWorkouts) => {
      queryClient.setQueryData<UserWorkout[]>(
        ['allWorkoutsSortedByTimestamp'],
        (oldWorkouts): UserWorkout[] | undefined => {
          if (!oldWorkouts) return;
          return mergeUpdatedWorkoutsWithOldWorkouts({
            oldWorkouts,
            updatedWorkouts,
          });
        }
      );
    },
  });
};

function mergeUpdatedWorkoutsWithOldWorkouts({
  oldWorkouts,
  updatedWorkouts,
}: {
  oldWorkouts: UserWorkout[];
  updatedWorkouts: UserWorkout[];
}) {
  return oldWorkouts.map((oldWorkout) => {
    const updatedWorkout = updatedWorkouts.find((u) =>
      u.timestamp.isEqual(oldWorkout.timestamp)
    );

    return updatedWorkout ? { ...oldWorkout, ...updatedWorkout } : oldWorkout;
  });
}
