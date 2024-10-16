import React from 'react';
import { Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/db.service';
import ScoreboardListItem from './Scoreboard/ScoreboardListItem';
import TopThreeUsers from './Scoreboard/TopThreeUsers';

export default function Scoreboard() {
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  if (isLoadingUsers || !users) {
    return <Text>Loading users...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TopThreeUsers users={users} />
        {users.map((user, index) => (
          <ScoreboardListItem key={user.uid} user={user} rank={index + 1} />
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
