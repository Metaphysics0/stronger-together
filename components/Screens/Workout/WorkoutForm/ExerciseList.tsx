import React from 'react';
import ExerciseListItem from './ExerciseListItem';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
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

  const renderListItem = ({ item, drag, getIndex }: RenderItemParams<any>) => {
    const index = getIndex();

    return (
      <ExerciseListItem
        drag={drag}
        exerciseName={item.title}
        count={item.count}
        index={index}
      />
    );
  };

  return (
    <NestableScrollContainer style={{ maxHeight: 400 }}>
      <NestableDraggableFlatList
        activationDistance={0.8}
        data={uiExercises}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setExercises(data)}
      />
    </NestableScrollContainer>
  );
}
