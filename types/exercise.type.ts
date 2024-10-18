export enum ExerciseType {
  PUSH_UPS = 'push_ups',
  PULL_UPS = 'pull_ups',
  BURPEES = 'burpees',
  SQUATS = 'squats',
  SIT_UPS = 'sit_ups',
  WALKING = 'walking',
  RUNNING = 'running',
  CYCLING = 'cycling',
  BOXING = 'boxing',
}

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
};

export const exerciseTypeToName: Record<ExerciseType, string> = {
  [ExerciseType.BURPEES]: 'Burpees',
  [ExerciseType.PUSH_UPS]: 'Push Ups',
  [ExerciseType.PULL_UPS]: 'Pull Ups',
  [ExerciseType.SQUATS]: 'Squats',
  [ExerciseType.SIT_UPS]: 'Sit Ups',
  [ExerciseType.RUNNING]: 'Running (km) 🏃‍♂️',
  [ExerciseType.CYCLING]: 'Cycling (km) 🚴‍♂️',
  [ExerciseType.BOXING]: 'Boxing (minutes) 🥊',
  [ExerciseType.WALKING]: 'Walking (km) 🚶‍♂️',
};
