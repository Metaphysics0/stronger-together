import { ExerciseType } from '../enums/exercise-type.enum';

export interface UserWorkout {
  user_id: string;
  timestamp: Date;
  exercises: UserWorkoutExercise[];
  notes?: string;
}

export interface UserWorkoutExercise {
  exerciseName: ExerciseType;
  count: number;
  notes?: string;
}
