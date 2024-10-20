import { UserWorkoutExercise } from '@/types/user-workout.type';
import { Modalize } from 'react-native-modalize';
import { create } from 'zustand';

interface AddExerciseModalState {
  modalRef: React.RefObject<Modalize> | null;
  userWorkoutExercise: (UserWorkoutExercise & { index?: number }) | null;
  setModalRef: (modalizeRef: React.RefObject<Modalize>) => void;
  openModal: (
    userWorkoutExercise?: UserWorkoutExercise & { index?: number }
  ) => void;
  closeModal: () => void;
}

export const useAddExerciseModalStore = create<AddExerciseModalState>(
  (set) => ({
    modalRef: null,
    userWorkoutExercise: null,
    setModalRef: (modalRef: React.RefObject<Modalize>) => set({ modalRef }),
    openModal: (
      userWorkoutExercise?: UserWorkoutExercise & { index?: number }
    ) => {
      set((state) => {
        state.modalRef?.current?.open();
        state.userWorkoutExercise = userWorkoutExercise || null;
        return state;
      });
    },
    closeModal: () => {
      set((state) => {
        state.modalRef?.current?.close();
        state.userWorkoutExercise = null;
        return state;
      });
    },
  })
);
