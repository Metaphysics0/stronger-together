import { UserWorkoutExercise } from '@/types/user-workout.type';
import { create } from 'zustand';

interface ExerciseState {
  exercises: UserWorkoutExercise[];
  pushExercise: (exercise: UserWorkoutExercise) => void;
  popExercise: () => void;
  changeOrderOfExercise: ({
    index,
    newIndex,
  }: {
    index: number;
    newIndex: number;
  }) => void;
}

export const useSelectedExercisesStore = create<ExerciseState>((set) => ({
  exercises: [],
  pushExercise: (exercise: UserWorkoutExercise) =>
    set((state) => ({
      exercises: [...state.exercises, exercise],
    })),
  popExercise: () =>
    set((state) => ({
      exercises: state.exercises.slice(0, -1),
    })),
  changeOrderOfExercise: ({
    index,
    newIndex,
  }: {
    index: number;
    newIndex: number;
  }) =>
    set((state) => {
      const exercises = [...state.exercises];
      const [exercise] = exercises.splice(index, 1);
      exercises.splice(newIndex, 0, exercise);
      return { exercises };
    }),
}));
