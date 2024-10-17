import { create } from 'zustand';

interface SignInFormState {
  formActiveStates: {
    signUp: boolean;
    signIn: boolean;
  };
  setFormActiveState: (
    formActiveState: 'signUp' | 'signIn',
    isActive: boolean
  ) => void;
  clearFormActiveState: () => void;
}

export const useSignInWithEmailFormStore = create<SignInFormState>((set) => ({
  formActiveStates: {
    signUp: false,
    signIn: false,
  },
  setFormActiveState: (
    formActiveState: 'signUp' | 'signIn',
    isActive: boolean
  ) =>
    set((state) => ({
      formActiveStates: {
        ...state.formActiveStates,
        [formActiveState]: isActive,
      },
    })),
  clearFormActiveState: () =>
    set({
      formActiveStates: {
        signUp: false,
        signIn: false,
      },
    }),
}));
