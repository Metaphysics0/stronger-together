import { StrongerTogetherUser } from '@/types/models/stronger-together-user.type';
import { create } from 'zustand';

interface UserStatsModalState {
  isUserStatsModalActive: boolean;
  user: StrongerTogetherUser | undefined;
  setIsUserStatsModalActive: ({
    isUserStatsModalActive,
    user,
  }: {
    isUserStatsModalActive: boolean;
    user: StrongerTogetherUser | undefined;
  }) => void;
}

export const useUserStatsModalStore = create<UserStatsModalState>((set) => ({
  isUserStatsModalActive: false,
  user: undefined,
  setIsUserStatsModalActive: ({ isUserStatsModalActive, user }) =>
    set({ isUserStatsModalActive, user }),
}));
