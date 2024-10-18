import { create } from 'zustand';

interface AddExerciseModalState {
  shouldShow: boolean;
  setShouldShow: (shouldShow: boolean) => void;
}

export const useAddExerciseModalStore = create<AddExerciseModalState>(
  (set) => ({
    shouldShow: false,
    setShouldShow: (shouldShow) => set({ shouldShow }),
  })
);
