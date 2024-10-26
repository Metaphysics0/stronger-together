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
  setSignInFormActiveState: () => void;
  setSignUpFormActiveState: () => void;
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
  setSignInFormActiveState: () =>
    set({ formActiveStates: { signUp: false, signIn: true } }),
  setSignUpFormActiveState: () =>
    set({ formActiveStates: { signUp: true, signIn: false } }),
  clearFormActiveState: () =>
    set({
      formActiveStates: {
        signUp: false,
        signIn: false,
      },
    }),
}));
