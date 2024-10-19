import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import {
  exerciseTypeToName,
  getExerciseTypeToRepCountSuffix,
} from '@/utils/exercise-type-formatter.util';

type ExerciseListItemProps = {
  exerciseName: ExerciseType;
  count: number;
  index: number;
};

export default function ExerciseListItem({
  exerciseName,
  count,
  index,
}: ExerciseListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{index}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.exerciseName}>
          {exerciseTypeToName[exerciseName]}
        </Text>
        <Text style={styles.count}>
          {count} {getExerciseTypeToRepCountSuffix(exerciseName)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  indexContainer: {
    width: 30,
    height: 30,
    padding: 5,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  index: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingRight: 16,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
});
