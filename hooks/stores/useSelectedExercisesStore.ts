import { UserWorkoutExercise } from '@/types/user-workout.type';
import { create } from 'zustand';

interface ExerciseState {
  exercises: UserWorkoutExercise[];
  setExercises: (exercises: UserWorkoutExercise[]) => void;
}

export const useSelectedExercisesStore = create<ExerciseState>((set) => ({
  exercises: [],
  setExercises: (exercises) =>
    set((state) => ({
      exercises: [...state.exercises, ...exercises],
    })),
}));
