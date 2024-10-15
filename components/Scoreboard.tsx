import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers, getAllWeeklyWorkouts } from '@/services/db.service';
import { startOfWeek, endOfWeek } from 'date-fns';
import { User } from 'firebase/auth';
import { ExerciseType } from '@/types/exercise.type';

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
  const startDate = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(new Date(), { weekStartsOn: 0 }); // Saturday

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const { data: workouts, isLoading: isLoadingWorkouts } = useQuery({
    queryKey: ['weeklyWorkouts', startDate, endDate],
    queryFn: () => getAllWeeklyWorkouts(startDate, endDate),
  });

  if (isLoadingUsers || isLoadingWorkouts) {
    return <Text>Loading...</Text>;
  }

  const userScores: UserScore[] = calculateUserScores(users as User[]);
  const sortedUserScores = userScores.sort(
    (a, b) => b.totalScore - a.totalScore
  );

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
        Weekly Scoreboard
      </Text>
      <ScrollView horizontal>
        <View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}
          >
            <Text style={{ width: 100, fontWeight: 'bold' }}>User</Text>
            {Object.entries(exerciseIcons).map(([type, icon]) => (
              <Text
                key={type}
                style={{ width: 50, textAlign: 'center', fontWeight: 'bold' }}
              >
                {icon}
              </Text>
            ))}
            <Text
              style={{ width: 50, textAlign: 'center', fontWeight: 'bold' }}
            >
              Total
            </Text>
          </View>
          {sortedUserScores.map((userScore) => (
            <View
              key={userScore.user.uid}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                paddingVertical: 10,
              }}
            >
              <Text style={{ width: 100 }}>{userScore.user.displayName}</Text>
              {Object.entries(exerciseIcons).map(([type]) => (
                <Text key={type} style={{ width: 50, textAlign: 'center' }}>
                  {userScore.scores[type as ExerciseType] || 0}
                </Text>
              ))}
              <Text
                style={{ width: 50, textAlign: 'center', fontWeight: 'bold' }}
              >
                {userScore.totalScore}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
