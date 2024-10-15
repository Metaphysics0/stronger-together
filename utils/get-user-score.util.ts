import { StrongerTogetherUser } from '@/types/stronger-together-user.type';

export function getUserScore(user: StrongerTogetherUser) {
  return user.workouts.reduce((acc, curr) => acc + curr.count, 0);
}
