import { create } from 'zustand';

interface UserStatsModalState {
  isUserStatsModalActive: boolean;
  setIsUserStatsModalActive: (isUserStatsModalActive: boolean) => void;
}

export const useUserStatsModalStore = create<UserStatsModalState>((set) => ({
  isUserStatsModalActive: false,
  setIsUserStatsModalActive: (isUserStatsModalActive) =>
    set({ isUserStatsModalActive }),
}));
