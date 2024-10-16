import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StrongerTogetherUser } from '@/types/stronger-together-user.type';
interface ScoreboardListItemProps {
  user: StrongerTogetherUser;
  rank: number;
}

export default function ScoreboardListItem({
  user,
  rank,
}: ScoreboardListItemProps) {
  const score = user.workouts.reduce(
    (total, workout) => total + workout.count,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.rank}>#{rank}</Text>
      <View style={styles.card}>
        <Image
          source={{ uri: user.photoUrl || 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.displayName}</Text>
        </View>
        <Text style={styles.score}>{score} pt.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    width: 30,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  score: {
    fontSize: 15,
    fontWeight: '300',
  },
});
