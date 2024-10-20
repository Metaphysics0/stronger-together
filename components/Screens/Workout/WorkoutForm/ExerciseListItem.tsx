import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import {
  exerciseTypeToName,
  getRepsCountText,
} from '@/utils/exercise-type-formatter.util';
import Feather from '@expo/vector-icons/Feather';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import SwipableItem from 'react-native-swipeable-item';
import { useAddExerciseModalStore } from '@/hooks/stores/modals/useAddExerciseModalStore';
import { FontAwesome } from '@expo/vector-icons';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';
import isNumber from 'lodash/isNumber';

type ExerciseListItemProps = {
  exerciseName: ExerciseType;
  count: number;
  drag: () => void;
  index?: number;
};

export default function ExerciseListItem({
  exerciseName,
  count,
  drag,
  index,
}: ExerciseListItemProps) {
  const { openModal } = useAddExerciseModalStore();
  const { removeExerciseAtIndex } = useSelectedExercisesStore();

  return (
    <ScaleDecorator>
      <SwipableItem
        item={exerciseName}
        renderUnderlayLeft={() => (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => isNumber(index) && removeExerciseAtIndex(index)}
          >
            <FontAwesome name="trash" size={24} color="tomato" />
          </TouchableOpacity>
        )}
        overSwipe={50}
        snapPointsLeft={[100]}
      >
        <TouchableOpacity
          style={styles.container}
          onLongPress={drag}
          onPress={() => openModal({ exerciseName, count })}
        >
          <View style={styles.exerciseNameContainer}>
            <Text style={styles.exerciseNameText}>
              {exerciseTypeToName[exerciseName]}
            </Text>
            <Text style={styles.countText}>
              {getRepsCountText({ exerciseName, count })}
            </Text>
          </View>
          <Feather name="menu" size={24} style={styles.dragHandle} />
        </TouchableOpacity>
      </SwipableItem>
    </ScaleDecorator>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginVertical: 5,
  },
  exerciseNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseNameText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  countText: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'italic',
    color: '#333',
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  dragHandle: {
    opacity: 0.5,
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    height: '100%',
    opacity: 0.75,
    padding: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
});
