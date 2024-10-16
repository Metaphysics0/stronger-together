import { StrongerTogetherUser } from '@/types/stronger-together-user.type';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface TopThreeUsersProps {
  users: StrongerTogetherUser[];
}

export default function TopThreeUsers({ users }: TopThreeUsersProps) {
  const topThree = users.slice(0, 3);

  const renderUser = (user: StrongerTogetherUser, index: number) => {
    const isFirst = index === 1; // Note: index 1 is the first (center) user in our layout
    return (
      <View
        key={user.email}
        style={[styles.userContainer, isFirst && styles.firstUser]}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user.photoUrl || 'https://via.placeholder.com/100' }}
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
      </View>
    );
  };

  return (
    <LinearGradient colors={['#FFA500', '#FFD700']} style={styles.container}>
      <Text style={styles.title}>Workout Beasts</Text>
      <View style={styles.usersContainer}>
        {/* {renderUser(topThree[1], 0)} */}
        {renderUser(topThree[0], 1)}
        {/* {renderUser(topThree[2], 2)} */}
      </View>
    </LinearGradient>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
