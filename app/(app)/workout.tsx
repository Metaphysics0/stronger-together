import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import ExerciseListItem from '@/components/Screens/Workout/WorkoutFormV2/ExerciseListItem';
import SubmitWorkoutButton from '@/components/Screens/Workout/WorkoutFormV2/SubmitWorkoutButton';
import { ExerciseType } from '@/types/exercise.type';
import { useSelectedExercisesStore } from '@/hooks/stores/useSelectedExercisesStore';

interface Exercise {
  type: ExerciseType;
  count: number;
}

export default function WorkoutPage() {
  const { exercises, setExercises } = useSelectedExercisesStore();

  const handleAddExercise = () => {
    console.log('Open add exercise modal');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        {exercises.map((exercise, index) => (
          <ExerciseListItem
            key={index}
            exerciseName={exercise.exercise}
            count={exercise.count}
            index={index + 1}
          />
        ))}
        <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
      <SubmitWorkoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  scrollViewContent: {
    marginVertical: 'auto',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
