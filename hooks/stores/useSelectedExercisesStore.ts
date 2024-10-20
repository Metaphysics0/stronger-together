import { UserWorkoutExercise } from '@/types/user-workout.type';
import { create } from 'zustand';

interface ExerciseState {
  exercises: UserWorkoutExercise[];
  pushExercise: (exercise: UserWorkoutExercise) => void;
  removeExerciseAtIndex: (index: number) => void;
  setExercises: (exercises: UserWorkoutExercise[]) => void;
}

export const useSelectedExercisesStore = create<ExerciseState>((set) => ({
  exercises: [],
  pushExercise: (exercise: UserWorkoutExercise) =>
    set((state) => ({
      exercises: [...state.exercises, exercise],
    })),
  removeExerciseAtIndex: (index: number) =>
    set((state) => ({
      exercises: state.exercises.filter((_, i) => i !== index),
    })),
  setExercises: (exercises: UserWorkoutExercise[]) =>
    set(() => ({ exercises })),
}));
