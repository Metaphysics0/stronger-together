import React from 'react';
import { Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/db.service';
import TopThreeUsers from './TopThreeUsers';
import { getUserScore } from '@/utils/get-user-score.util';
import LeaderboardListItem from './LeaderboardListItem';

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TopThreeUsers users={usersSortedByScore} />
        {users.map((user, index) => (
          <LeaderboardListItem key={user.uid} user={user} rank={index + 1} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
