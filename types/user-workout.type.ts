import { ExerciseType } from './exercise.type';

export interface UserWorkout {
  exercise: ExerciseType;
  count: number;
  timestamp: Date;
}
