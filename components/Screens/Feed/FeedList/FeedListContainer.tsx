import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import {
  getAllWorkoutsSortedByTimestamp,
  getAllUsers,
} from '@/services/db.service';
import FeedListItem from './FeedListItem';
import { UserWorkout } from '@/types/models/user-workout.type';
import Text from '@/components/common/Text';
import { LikeWorkoutService } from '@/services/like-workout.service';
import { useSession } from '@/providers/SessionProvider';

export default function FeedListContainer() {
  const { data: workouts, isLoading: isLoadingWorkouts } = useQuery({
    queryKey: ['allWorkoutsSortedByTimestamp'],
    queryFn: getAllWorkoutsSortedByTimestamp,
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const { session: currentUserId } = useSession();

  const handleLike = async ({
    workout,
    workoutOwnerUserId,
  }: {
    workout: UserWorkout;
    workoutOwnerUserId: string;
  }) => {
    if (!currentUserId) {
      console.warn(
        'handleLike - Unable to like workout, no current user id in session'
      );
      return;
    }

    const workoutOwnerUser = users?.find((u) => u.uid === workoutOwnerUserId);
    if (!workoutOwnerUser) {
      console.warn(
        'handleLike - Unable to like workout, no workout owner user found'
      );
      return;
    }

    const likeWorkoutService = new LikeWorkoutService();
    await likeWorkoutService.likeOrUnlikeWorkout({
      workout,
      workoutOwnerUser,
      currentUserId,
    });
  };

  if (isLoadingWorkouts || isLoadingUsers) {
    return <Text>Loading feed...</Text>;
  }

  const sortedWorkouts = workouts?.sort(
    (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedWorkouts}
        keyExtractor={(item) => item.timestamp.toMillis().toString()}
        renderItem={({ item: workout }) => {
          const user = users?.find((u) => u.uid === workout.userId);
          if (!user) return null;

          return (
            <FeedListItem
              workout={workout}
              user={user}
              onLike={() =>
                handleLike({ workout, workoutOwnerUserId: user.uid })
              }
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
