import { UserWorkout } from './user-workout.type';

// firebase users collection uid -> User
export interface StrongerTogetherUser {
  displayName: string;
  email: string;
  photoUrl: string | null;
  workouts: UserWorkout[];
  provider: 'email' | 'google';
  expoPushToken: string | null;
}
