import { exerciseTypeToScore } from '@/utils/exercise-type-formatter.util';
import { ExerciseType } from '@/types/enums/exercise-type.enum';
import { exerciseTypeToName } from '@/utils/exercise-type-formatter.util';

export const AVAILABLE_EXERCISES: {
  name: string;
  value: ExerciseType;
  score: number;
}[] = Object.values(ExerciseType).map((exercise) => ({
  name: exerciseTypeToName[exercise],
  value: exercise,
  score: exerciseTypeToScore[exercise],
}));
