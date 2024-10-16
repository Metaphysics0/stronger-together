import { create } from 'zustand';

interface SignInFormState {
  isSignUpWithEmailFormActive: boolean;
  isSignInWithEmailFormActive: boolean;
  setIsSignUpWithEmailFormActive: (
    isSignUpWithEmailFormActive: boolean
  ) => void;
  setIsSignInWithEmailFormActive: (
    isSignInWithEmailFormActive: boolean
  ) => void;
  clearSignInWithEmailFormState: () => void;
}

export const useSignInWithEmailFormStore = create<SignInFormState>((set) => ({
  isSignUpWithEmailFormActive: false,
  isSignInWithEmailFormActive: false,
  setIsSignUpWithEmailFormActive: (isSignUpWithEmailFormActive) =>
    set({ isSignUpWithEmailFormActive }),
  setIsSignInWithEmailFormActive: (isSignInWithEmailFormActive) =>
    set({ isSignInWithEmailFormActive }),
  clearSignInWithEmailFormState: () =>
    set({
      isSignUpWithEmailFormActive: false,
      isSignInWithEmailFormActive: false,
    }),
}));
