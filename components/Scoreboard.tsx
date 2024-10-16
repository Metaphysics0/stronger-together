import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/db.service';
import { User } from 'firebase/auth';
import { ExerciseType } from '@/types/exercise.type';
import ScoreboardListItem from './Scoreboard/ScoreboardListItem';
import TopThreeUsers from './Scoreboard/TopThreeUsers';

// ... existing imports ...

const exerciseIcons: Record<ExerciseType, string> = {
  [ExerciseType.PUSH_UPS]: '💪',
  [ExerciseType.SIT_UPS]: '🦵',
  [ExerciseType.SQUATS]: '🏋️',
  [ExerciseType.BURPEES]: '🏋️',
  [ExerciseType.PULL_UPS]: '🏋️',
};

interface UserScore {
  user: User;
  scores: Record<ExerciseType, number>;
  totalScore: number;
}

export default function Scoreboard() {
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  if (isLoadingUsers || !users) {
    return <Text>Loading users...</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 20,
        }}
      >
        Scoreboard
      </Text>
      <TopThreeUsers users={users} />
      {users.map((user, index) => (
        <ScoreboardListItem key={user.uid} user={user} rank={index + 1} />
      ))}
    </ScrollView>
  );
}

function calculateUserScores(users: User[]): UserScore[] {
  const userScores: UserScore[] = users.map((user) => ({
    user,
    scores: {} as Record<ExerciseType, number>,
    totalScore: 0,
  }));

  // workouts.forEach((workout) => {
  //   const userScore = userScores.find(
  //     (score) => score.user.uid === workout.userId
  //   );
  //   if (userScore) {
  //     if (!userScore.scores[workout.exercise]) {
  //       userScore.scores[workout.exercise] = 0;
  //     }
  //     userScore.scores[workout.exercise] += workout.count;
  //     userScore.totalScore += workout.count;
  //   }
  // });

  return userScores;
}
