import { ExerciseType, exerciseTypeToName } from '@/types/exercise.type';
import _ from 'lodash';

export function getWorkoutPushNotificationMessageParams(
  params: GetWorkoutPushNotificationMessageParams
) {
  return {
    title: 'Stronger Together',
    body: getRandomWorkoutPushNotificationMessage(params),
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
    `${userDisplayName} just crushed ${count} ${friendlyExerciseName}!`,
    `Wow! ${userDisplayName} completed ${count} ${friendlyExerciseName}. Impressive!`,
    `${userDisplayName} is on fire! ${count} ${friendlyExerciseName} done!`,
    `Look at ${userDisplayName} go! ${count} ${friendlyExerciseName} in the books.`,
    `${userDisplayName} is making gains with ${count} ${friendlyExerciseName}!`,
    `${count} ${friendlyExerciseName}?? ${userDisplayName} is unstoppable!`,
    `${userDisplayName} just raised the bar with ${count} ${friendlyExerciseName}.`,
    `Incredible effort by ${userDisplayName}: ${count} ${friendlyExerciseName} completed!`,
    `${userDisplayName} is putting in work: ${count} ${friendlyExerciseName} done!`,
    `${count} ${friendlyExerciseName} from the one and only ${userDisplayName}`,
    `Are you really going to let ${userDisplayName} beat you? ${count} ${friendlyExerciseName}!`,
  ];

  return _.sample(messageBodies);
}

interface GetWorkoutPushNotificationMessageParams {
  userDisplayName: string;
  exercise: ExerciseType;
  count: number;
}
