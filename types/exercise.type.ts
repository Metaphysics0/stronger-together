export enum ExerciseType {
  BURPEES = 'burpees',
  PUSH_UPS = 'push_ups',
  PULL_UPS = 'pull_ups',
  SQUATS = 'squats',
  SIT_UPS = 'sit_ups',
}

export const exerciseTypeToName = {
  [ExerciseType.BURPEES]: 'Burpees',
  [ExerciseType.PUSH_UPS]: 'Push Ups',
  [ExerciseType.PULL_UPS]: 'Pull Ups',
  [ExerciseType.SQUATS]: 'Squats',
  [ExerciseType.SIT_UPS]: 'Sit Ups',
};
