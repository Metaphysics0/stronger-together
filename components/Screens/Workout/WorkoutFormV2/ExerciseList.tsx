import { ScrollView } from 'react-native-gesture-handler';
import ExerciseListItem from './ExerciseListItem';
import { ExerciseType } from '@/types/exercise.type';

export function ExerciseList() {
  return (
    <ScrollView scrollEventThrottle={16}>
      <ExerciseListItem
        exerciseName={ExerciseType.BURPEES}
        count={10}
        index={1}
      />
    </ScrollView>
  );
}
