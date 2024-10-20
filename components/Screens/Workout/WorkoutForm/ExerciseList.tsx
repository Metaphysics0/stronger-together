import React, { useState } from 'react';
import ExerciseListItem from './ExerciseListItem';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';
import AddExerciseButton from './AddExerciseButton';

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

  const [activationDistance, setActivationDistance] = useState(100);

  return (
    <NestableScrollContainer
      style={{ flex: 1 }}
      scrollEnabled={activationDistance !== 0}
    >
      <NestableDraggableFlatList
        activationDistance={activationDistance}
        data={uiExercises}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        onDragBegin={() => setActivationDistance(0)}
        onDragEnd={({ data }) => {
          setActivationDistance(1);
          setExercises(data);
        }}
      />
      <AddExerciseButton />
    </NestableScrollContainer>
  );
}
