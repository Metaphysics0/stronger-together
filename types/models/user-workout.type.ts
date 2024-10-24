import { ExerciseType } from '../enums/exercise-type.enum';
import { Timestamp } from 'firebase/firestore';
export interface UserWorkout {
  timestamp: Timestamp;
  exercises: UserWorkoutExercise[];
  notes?: string;
  likedUserIds?: string[];
}

export interface UserWorkoutExercise {
  exerciseName: ExerciseType;
  count: number;
  notes?: string;
}
