import React from 'react';
import { UserWorkoutExercise } from '@/types/user-workout.type';
import ExerciseListItem from './ExerciseListItem';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';

export function ExerciseList() {
  const { exercises, setExercises } = useSelectedExercisesStore();
  const uiExercises = exercises.map((exercise, index) => ({
    id: (Math.random() + 1).toString(36).substring(7),
    title: exercise.exerciseName,
    index: index + 1,
    ...exercise,
  }));

  const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
    return (
      <ExerciseListItem
        drag={drag}
        exerciseName={item.title}
        count={item.count}
        onDelete={() => {
          console.log('deleting');
        }}
      />
    );
  };

  const keyExtractor = (item: (typeof uiExercises)[0]) => item.id;

  const onOrderChange = (newOrder: UserWorkoutExercise[]) => {
    setExercises(newOrder);
  };

  return (
    <DraggableFlatList
      activationDistance={0.8}
      data={uiExercises}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onDragEnd={({ data }) => onOrderChange(data)}
    />
  );
}
