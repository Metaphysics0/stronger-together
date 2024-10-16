import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/db.service';
import { getUserScore } from '@/utils/get-user-score.util';
import ParallaxLeaderboard from './ParallaxLeaderboard';
import { useUserStatsModalStore } from '@/hooks/stores/useUserStatsModalStore';

export default function LeaderboardContainer() {
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  if (isLoadingUsers || !users) {
    return <Text>Loading leaderboard...</Text>;
  }

  const usersSortedByScore = users.sort(
    (a, b) => getUserScore(b) - getUserScore(a)
  );

  const { setIsUserStatsModalActive } = useUserStatsModalStore();

  return (
    <SafeAreaView style={styles.container}>
      <ParallaxLeaderboard users={usersSortedByScore} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
