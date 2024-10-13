import { ExerciseType } from '@/types/exercise.type';

export const AVAILABLE_EXERCISES: { name: string; value: ExerciseType }[] = [
  { name: 'Burpees', value: ExerciseType.BURPEES },
  { name: 'Push Ups', value: ExerciseType.PUSH_UPS },
  { name: 'Pull Ups', value: ExerciseType.PULL_UPS },
  { name: 'Squats', value: ExerciseType.SQUATS },
  { name: 'Sit Ups', value: ExerciseType.SIT_UPS },
];
