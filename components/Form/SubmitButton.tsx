import { useExerciseStore } from '@/hooks/stores/useSelectedExerciseStore';
import { submitWorkout } from '@/services/db.service';
import { ExerciseType } from '@/types/exercise.type';
import { getAuth } from 'firebase/auth';
import { Pressable, StyleSheet, Text } from 'react-native';

export function SubmitButton() {
  const { exerciseName, repsCount } = useExerciseStore();
  const auth = getAuth();
  const handleSubmit = () => {
    if (!auth.currentUser) {
      console.error('User is not logged in');
      return;
    }

    submitWorkout({
      exercise: exerciseName as ExerciseType,
      count: repsCount,
      uid: auth.currentUser.uid,
    });
  };

  return (
    <Pressable style={styles.button} onPress={handleSubmit}>
      <Text style={styles.text}>🚀</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 45,
  },
});
