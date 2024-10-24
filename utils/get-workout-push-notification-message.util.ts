import { getExerciseTypeToRepCountSuffix } from '@/utils/exercise-type-formatter.util';
import { UserWorkoutExercise } from '@/types/models/user-workout.type';
import { ExerciseType } from '@/types/enums/exercise-type.enum';

const NOTIFICATION_TITLE = 'Stronger Together';

export function getWorkoutPushNotificationMessage({
  userDisplayName,
  exercises,
}: {
  userDisplayName: string;
  exercises: UserWorkoutExercise[];
}) {
  if (exercises.length === 1) {
    return {
      title: NOTIFICATION_TITLE,
      body: getSingleExercisePushNotificationMessage({
        userDisplayName,
        exercise: exercises[0],
      }),
    };
  }

  const messages = [
    `${userDisplayName} just crushed an epic workout!`,
    `${userDisplayName} is on fire! They just completed a killer session!`,
    `Workout beast mode: ${userDisplayName} edition!`,
    `${userDisplayName} is making gains and taking names!`,
    `Another day, another awesome workout for ${userDisplayName}!`,
    `${userDisplayName} is unstoppable! Check out their latest workout!`,
    `Fitness goals? ${userDisplayName} is smashing them!`,
    `${userDisplayName} just leveled up their fitness game!`,
    `Sweat, determination, and ${userDisplayName} - a perfect combo!`,
    `${userDisplayName} is redefining what it means to work hard!`,
  ];

  // Add exercise-specific messages
  if (exercises.length > 0) {
    const randomExercise =
      exercises[Math.floor(Math.random() * exercises.length)];
    const friendlyExerciseName = getFriendlyExerciseName(randomExercise);

    messages.push(
      `${userDisplayName} just did an insane workout, with ${friendlyExerciseName}!`,
      `${userDisplayName} is a superhero, and did ${friendlyExerciseName} in their workout!`,
      `Incredible! ${userDisplayName} crushed ${friendlyExerciseName} like it was nothing!`,
      `${userDisplayName} is on a roll with ${friendlyExerciseName}! Can you keep up?`
    );
  }

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return {
    title: 'Stronger Together',
    body: randomMessage,
  };
}

function getSingleExercisePushNotificationMessage({
  userDisplayName,
  exercise,
}: {
  userDisplayName: string;
  exercise: UserWorkoutExercise;
}) {
  const friendlyExerciseName = getFriendlyExerciseName(exercise);
  return `${userDisplayName} just did ${friendlyExerciseName}!`;
}

function getFriendlyExerciseName({
  exerciseName,
  count,
}: {
  exerciseName: ExerciseType;
  count: number;
}) {
  const countUnit = getExerciseTypeToRepCountSuffix({ exerciseName, count });
  return `${count} ${countUnit} ${exerciseName}`;
}

interface GetWorkoutPushNotificationMessageParams {
  userDisplayName: string;
  exercises: UserWorkoutExercise[];
}
