import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { ListItem } from 'react-native-ui-lib';
import {
  exerciseTypeToName,
  getRepsCountText,
} from '@/utils/exercise-type-formatter.util';
import Feather from '@expo/vector-icons/Feather';

type ExerciseListItemProps = {
  exerciseName: ExerciseType;
  count: number;
  index: number;
  onDelete: () => void;
};

export default function ExerciseListItem({
  exerciseName,
  count,
  index,
  onDelete,
}: ExerciseListItemProps) {
  return (
    <ListItem onPress={() => console.log('pressed')} style={styles.container}>
      <View style={styles.exerciseNameContainer}>
        <Text style={styles.exerciseNameText}>
          {exerciseTypeToName[exerciseName]} -
        </Text>
        <Text style={styles.countText}>
          {getRepsCountText({ exerciseName, count })}
        </Text>
      </View>
      <Feather name="menu" size={24} />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#e8e8e8',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  exerciseNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseNameText: {
    fontSize: 18,
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
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
});
