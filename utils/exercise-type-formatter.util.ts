import { ExerciseType } from '@/types/enums/exercise-type.enum';

export const exerciseTypeToScore: Record<ExerciseType, number> = {
  [ExerciseType.BURPEES]: 3,
  [ExerciseType.PUSH_UPS]: 1,
  [ExerciseType.PULL_UPS]: 2,
  [ExerciseType.SQUATS]: 1,
  [ExerciseType.SIT_UPS]: 1,
  [ExerciseType.RUNNING]: 1,
  [ExerciseType.CYCLING]: 1,
  [ExerciseType.BOXING]: 1,
  [ExerciseType.WALKING]: 1,
  [ExerciseType.MEDITATION]: 100,
  [ExerciseType.COLD_SHOWER]: 100,
};

export const exerciseTypeToName: Record<ExerciseType, string> = {
  [ExerciseType.BURPEES]: 'Burpees',
  [ExerciseType.PUSH_UPS]: 'Push Ups',
  [ExerciseType.PULL_UPS]: 'Pull Ups',
  [ExerciseType.SQUATS]: 'Squats',
  [ExerciseType.SIT_UPS]: 'Sit Ups',
  [ExerciseType.RUNNING]: 'Running 🏃‍♂️',
  [ExerciseType.CYCLING]: 'Cycling 🚴‍♂️',
  [ExerciseType.BOXING]: 'Boxing 🥊',
  [ExerciseType.WALKING]: 'Walking 🚶‍♂️',
  [ExerciseType.MEDITATION]: 'Meditation 🧘‍♂️',
  [ExerciseType.COLD_SHOWER]: 'Cold Shower 🥶🚿',
};

export const exerciseTypeToMaxRepsCount: Record<ExerciseType, number> = {
  [ExerciseType.BURPEES]: 300,
  [ExerciseType.PUSH_UPS]: 300,
  [ExerciseType.PULL_UPS]: 300,
  [ExerciseType.SQUATS]: 300,
  [ExerciseType.SIT_UPS]: 300,
  [ExerciseType.RUNNING]: 50,
  [ExerciseType.CYCLING]: 100,
  [ExerciseType.BOXING]: 100,
  [ExerciseType.WALKING]: 100,
  [ExerciseType.COLD_SHOWER]: 1,
  [ExerciseType.MEDITATION]: 100,
};

export const getExerciseTypeToRepCountSuffix = (exerciseName: ExerciseType) =>
  exerciseTypeToRepCountSuffix[exerciseName] ?? 'reps';

export const exerciseTypeToRepCountSuffix: Partial<
  Record<ExerciseType, string>
> = {
  [ExerciseType.RUNNING]: 'min',
  [ExerciseType.CYCLING]: 'min',
  [ExerciseType.WALKING]: 'min',
  [ExerciseType.MEDITATION]: 'min',
  [ExerciseType.BOXING]: 'min',
};
