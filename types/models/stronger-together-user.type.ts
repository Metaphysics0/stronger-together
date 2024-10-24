import { UserWorkout } from './user-workout.type';

export interface StrongerTogetherUser {
  displayName: string;
  email: string;
  photoUrl: string | null;
  workouts: UserWorkout[];
  provider: 'email' | 'google';
  expoPushToken: string | null;
}

export interface StrongerTogetherDbUser extends StrongerTogetherUser {
  uid: string;
}
