import {
  ExerciseType,
  exerciseTypeToName,
  exerciseTypeToScore,
} from '@/types/exercise.type';

export const AVAILABLE_EXERCISES: {
  name: string;
  value: ExerciseType;
  score: number;
}[] = Object.values(ExerciseType).map((exercise) => ({
  name: exerciseTypeToName[exercise],
  value: exercise,
  score: exerciseTypeToScore[exercise],
}));
