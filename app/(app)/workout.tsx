import React, { useState } from 'react';
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

interface Exercise {
  type: ExerciseType;
  count: number;
}

export default function WorkoutPage() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { type: ExerciseType.BURPEES, count: 10 },
  ]);

  const handleAddExercise = () => {
    // This function will be called when the 'Add Exercise' button is pressed
    // Here you would typically open your half-screen modal
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
            exerciseName={exercise.type}
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
  },
  scrollViewContent: {
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
