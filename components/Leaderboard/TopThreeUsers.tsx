import { PLACEHOLDER_PROFILE_IMAGE_URL } from '@/constants/placeholder-image-url.constant';
import { useUserStatsModalStore } from '@/hooks/stores/useUserStatsModalStore';
import { StrongerTogetherUser } from '@/types/stronger-together-user.type';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface TopThreeUsersProps {
  users: StrongerTogetherUser[];
}

export default function TopThreeUsers({ users }: TopThreeUsersProps) {
  const { setIsUserStatsModalActive } = useUserStatsModalStore();

  const topThree = users.slice(0, 3);

  const renderUser = (user: StrongerTogetherUser, index: number) => {
    const isFirst = index === 1;
    return (
      <TouchableOpacity
        key={user.email}
        style={[styles.userContainer, isFirst && styles.firstUser]}
        onPress={() => {
          setIsUserStatsModalActive({ isUserStatsModalActive: true, user });
        }}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user.photoUrl || PLACEHOLDER_PROFILE_IMAGE_URL }}
            style={styles.avatar}
          />
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>
              #{index === 1 ? 1 : index === 0 ? 2 : 3}
            </Text>
          </View>
        </View>
        <Text style={[styles.name, isFirst && styles.firstName]}>
          {user.displayName}
        </Text>
        <Text style={[styles.score, isFirst && styles.firstScore]}>
          {user.workouts.reduce((total, workout) => total + workout.count, 0)}{' '}
          pt.
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Beasts</Text>
      <View style={styles.usersContainer}>
        {renderUser(topThree[1], 0)}
        {renderUser(topThree[0], 1)}
        {renderUser(topThree[2], 2)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#FFA500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  usersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  userContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  firstUser: {
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  rankBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginTop: 5,
  },
  firstName: {
    fontSize: 16,
  },
  score: {
    fontSize: 12,
    color: 'white',
    marginTop: 2,
  },
  firstScore: {
    fontSize: 14,
  },
});
