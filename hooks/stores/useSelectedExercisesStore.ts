import { UserWorkoutExercise } from '@/types/user-workout.type';
import { create } from 'zustand';

interface ExerciseState {
  exercises: UserWorkoutExercise[];
  pushExercise: (exercise: UserWorkoutExercise) => void;
  removeExerciseAtIndex: (index: number) => void;
  updateExerciseAtIndex: (index: number, exercise: UserWorkoutExercise) => void;
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
  updateExerciseAtIndex: (index: number, exercise: UserWorkoutExercise) =>
    set((state) => ({
      exercises: state.exercises.map((e, i) => (i === index ? exercise : e)),
    })),
  setExercises: (exercises: UserWorkoutExercise[]) =>
    set(() => ({ exercises })),
}));
