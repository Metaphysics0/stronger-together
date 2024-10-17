import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StrongerTogetherUser } from '@/types/stronger-together-user.type';
import { useUserStatsModalStore } from '@/hooks/stores/useUserStatsModalStore';
import { getUserScore } from '@/utils/get-user-score.util';

interface LeaderboardListItemProps {
  user: StrongerTogetherUser;
  rank: number;
}

export default function LeaderboardListItem({
  user,
  rank,
}: LeaderboardListItemProps) {
  const { setIsUserStatsModalActive } = useUserStatsModalStore();

  const score = getUserScore(user);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setIsUserStatsModalActive({ isUserStatsModalActive: true, user });
      }}
    >
      <Text style={styles.rank}>#{rank}</Text>
      <View style={styles.card}>
        {user.photoUrl ? (
          <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
        ) : (
          <Image
            source={require('../../assets/images/profile-picture-placeholder.png')}
            style={styles.avatar}
          />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.displayName}</Text>
        </View>
        <Text style={styles.score}>{score} points</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8, //
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
