import { StrongerTogetherUser } from '@/types/models/stronger-together-user.type';
import _ from 'lodash';

export function getUserScore(user: StrongerTogetherUser) {
  return _.sumBy(user.workouts, 'count');
}
