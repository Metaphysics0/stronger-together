import { ExerciseType } from '@/types/exercise.type';
import { create } from 'zustand';

interface ExerciseState {
  exerciseName: ExerciseType;
  repsCount: number;
  setExerciseName: (name: ExerciseType) => void;
  setRepsCount: (count: number) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exerciseName: Object.values(ExerciseType)[0],
  repsCount: 1,
  setExerciseName: (exerciseName) => set({ exerciseName }),
  setRepsCount: (repsCount) => set({ repsCount }),
}));
