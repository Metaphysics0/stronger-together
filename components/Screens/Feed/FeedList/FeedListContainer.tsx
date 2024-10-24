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

export default function FeedListContainer() {
  const { data: workouts, isLoading: isLoadingWorkouts } = useQuery({
    queryKey: ['allWorkoutsSortedByTimestamp'],
    queryFn: getAllWorkoutsSortedByTimestamp,
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const handleLike = async (workout: UserWorkout, userId: string) => {
    if (!workout) return;
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
        renderItem={({ item }) => {
          const user = users?.find((u) => u.uid === item.userId);
          if (!user) return null;
          return (
            <FeedListItem
              workout={item}
              user={user}
              onLike={() => handleLike(item, user.uid)}
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
