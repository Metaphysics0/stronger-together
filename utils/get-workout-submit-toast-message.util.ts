import { ExerciseType, exerciseTypeToName } from '@/types/exercise.type';
import _ from 'lodash';

export function getWorkoutSubmitToastMessage({
  exercise,
  repsCount,
}: {
  exercise: ExerciseType;
  repsCount: number;
}) {
  const friendlyExerciseName = exerciseTypeToName[exercise];
  const messages = [
    `${repsCount} ${friendlyExerciseName}! Nice work 💪`,
    `Wow! You just did ${repsCount} ${friendlyExerciseName}. Great work! 🎉`,
    `${friendlyExerciseName} are no joke. And you just did ${repsCount} 🔥`,
    `You're the ${friendlyExerciseName} champion! ${repsCount} reps? Impressive! 🏆`,
    `Lucky number ${repsCount}. Great job on those ${friendlyExerciseName}! 🍀`,
    `${repsCount} ${friendlyExerciseName}? You're on fire today! 🚀`,
    `Crushing it with ${repsCount} ${friendlyExerciseName}! Keep it up! 💯`,
    `${friendlyExerciseName} master! ${repsCount} reps is seriously impressive. 🌟`,
    `You make ${repsCount} ${friendlyExerciseName} look easy! Fantastic work! 👏`,
    `${repsCount} ${friendlyExerciseName} down, countless gains to go! You're unstoppable! 💪`,
    `Boom! ${repsCount} ${friendlyExerciseName} in the books. You're a machine! 🤖`,
  ];

  return _.sample(messages);
}
