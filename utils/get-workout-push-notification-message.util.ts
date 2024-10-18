import { ExerciseType, exerciseTypeToName } from '@/types/exercise.type';
import _ from 'lodash';

export function getWorkoutPushNotificationMessageParams(
  params: GetWorkoutPushNotificationMessageParams
) {
  return {
    title: 'Stronger Together',
    body: getRandomWorkoutPushNotificationMessage(params)!,
  };
}

function getRandomWorkoutPushNotificationMessage({
  userDisplayName,
  exercise,
  count,
}: GetWorkoutPushNotificationMessageParams) {
  const exerciseName = exerciseTypeToName[exercise]
    .replace(' (minutes)', '')
    .toLowerCase();
  const isTimeBasedExercise =
    exercise === ExerciseType.BOXING || exercise === ExerciseType.CYCLING;
  const countUnit = isTimeBasedExercise ? 'minutes of' : '';
  const friendlyExerciseName = countUnit + ' ' + exerciseName;

  const messageBodies = [
    `${userDisplayName} just did ${count} ${friendlyExerciseName}!`,
  ];

  return _.sample(messageBodies);
}

interface GetWorkoutPushNotificationMessageParams {
  userDisplayName: string;
  exercise: ExerciseType;
  count: number;
}
