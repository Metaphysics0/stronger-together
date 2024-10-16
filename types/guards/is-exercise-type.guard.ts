import { ExerciseType } from '../exercise.type';

export function isExerciseType(value: unknown): value is ExerciseType {
  return Object.values(ExerciseType).includes(value as ExerciseType);
}
