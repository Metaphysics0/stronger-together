import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SortableList } from 'react-native-ui-lib';
import { UserWorkoutExercise } from '@/types/user-workout.type';
import ExerciseListItem from './ExerciseListItem';

export function ExerciseList({
  exercises,
}: {
  exercises: UserWorkoutExercise[];
}) {
  const uiExercises = exercises.map((exercise, index) => ({
    id: (Math.random() + 1).toString(36).substring(7),
    title: exercise.exerciseName,
    index: index + 1,
    ...exercise,
  }));

  const renderItem = ({ item }: { item: (typeof uiExercises)[0] }) => {
    return (
      <ExerciseListItem
        exerciseName={item.title}
        count={item.count}
        index={item.index}
        onDelete={() => {
          console.log('deleting');
        }}
      />
    );
  };

  const keyExtractor = (item: (typeof uiExercises)[0]) => item.id;

  const onOrderChange = (newOrder: UserWorkoutExercise[]) => {
    console.log('newOrder', newOrder);
    // onOrderChange(newOrder);
  };

  return (
    <ScrollView scrollEventThrottle={16}>
      <SortableList
        data={uiExercises}
        onOrderChange={onOrderChange}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        flexMigration={true}
      />
    </ScrollView>
  );
}
