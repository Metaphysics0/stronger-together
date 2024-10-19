import {
  exerciseTypeToName,
  getExerciseTypeToRepCountSuffix,
} from '@/utils/exercise-type-formatter.util';
import { UserWorkoutExercise } from '@/types/user-workout.type';

export function getWorkoutPushNotificationMessageV2({
  userDisplayName,
  exercises,
}: {
  userDisplayName: string;
  exercises: UserWorkoutExercise[];
}) {
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
    const exerciseName = exerciseTypeToName[randomExercise.exerciseName];
    const count = randomExercise.count || 0;
    const countUnit = getExerciseTypeToRepCountSuffix(
      randomExercise.exerciseName
    );
    const friendlyExerciseName = `${count} ${countUnit} ${exerciseName}`;

    messages.push(
      `${userDisplayName} just did an insane workout, with ${friendlyExerciseName}!`,
      `${userDisplayName} is a superhero, and did ${friendlyExerciseName} in their workout!`,
      `Incredible! ${userDisplayName} crushed ${friendlyExerciseName} like it was nothing!`,
      `${userDisplayName} is on a roll with ${friendlyExerciseName}! Can you keep up?`
    );
  }

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return {
    title: 'Workout Completed!',
    body: randomMessage,
  };
}

interface GetWorkoutPushNotificationMessageParams {
  userDisplayName: string;
  exercises: UserWorkoutExercise[];
}
