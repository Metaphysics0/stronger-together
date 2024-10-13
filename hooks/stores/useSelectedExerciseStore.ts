import { AVAILABLE_EXERCISES } from '@/constants/available-exercises.constant';
import { ExerciseType } from '@/types/exercise.type';
import { create } from 'zustand';

interface ExerciseState {
  exerciseName: string;
  repsCount: number;
  setExerciseName: (name: ExerciseType) => void;
  setRepsCount: (count: number) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exerciseName: AVAILABLE_EXERCISES[0].name,
  repsCount: 1,
  setExerciseName: (exerciseName) => set({ exerciseName }),
  setRepsCount: (repsCount) => set({ repsCount }),
}));
