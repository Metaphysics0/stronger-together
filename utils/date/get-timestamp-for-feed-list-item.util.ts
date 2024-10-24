import { Timestamp } from 'firebase/firestore';
import { convertTimestampToDate } from '../convert-timestamp-to-date.util';
import {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_WEEK_IN_SECONDS,
  ONE_MONTH_IN_SECONDS,
} from '@/constants/date-times.constant';

export function getTimestampForFeedListItem(timestamp: Timestamp) {
  const now = new Date();
  const workoutDate = convertTimestampToDate(timestamp);
  const diffInSeconds = Math.floor(
    (now.getTime() - workoutDate.getTime()) / 1000
  );

  switch (true) {
    case diffInSeconds < ONE_MINUTE_IN_SECONDS:
      return 'just now';
    case diffInSeconds < ONE_HOUR_IN_SECONDS:
      return `${Math.floor(diffInSeconds / ONE_MINUTE_IN_SECONDS)}m ago`;
    case diffInSeconds < ONE_DAY_IN_SECONDS:
      return `${Math.floor(diffInSeconds / ONE_HOUR_IN_SECONDS)}h ago`;
    case diffInSeconds < ONE_WEEK_IN_SECONDS:
      return `${Math.floor(diffInSeconds / ONE_DAY_IN_SECONDS)}d ago`;
    case diffInSeconds < ONE_MONTH_IN_SECONDS:
      return `${Math.floor(diffInSeconds / ONE_WEEK_IN_SECONDS)}w ago`;
    default:
      return workoutDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
  }
}
