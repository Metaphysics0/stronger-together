import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import {
  exerciseTypeToName,
  getRepsCountText,
} from '@/utils/exercise-type-formatter.util';
import Feather from '@expo/vector-icons/Feather';
import { ScaleDecorator } from 'react-native-draggable-flatlist';

type ExerciseListItemProps = {
  exerciseName: ExerciseType;
  count: number;
  onDelete: () => void;
  drag: () => void;
};

export default function ExerciseListItem({
  exerciseName,
  count,
  onDelete,
  drag,
}: ExerciseListItemProps) {
  return (
    <ScaleDecorator>
      <TouchableOpacity style={styles.container} onLongPress={drag}>
        <View style={styles.exerciseNameContainer}>
          <Text style={styles.exerciseNameText}>
            {exerciseTypeToName[exerciseName]}
          </Text>
          <Text style={styles.countText}>
            ({getRepsCountText({ exerciseName, count })})
          </Text>
        </View>
        <Feather name="menu" size={24} style={styles.dragHandle} />
      </TouchableOpacity>
    </ScaleDecorator>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    // backgroundColor: '#e8e8e8',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
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
    // fontStyle: 'italic',
    color: '#333',
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  dragHandle: {
    opacity: 0.5,
  },
});
