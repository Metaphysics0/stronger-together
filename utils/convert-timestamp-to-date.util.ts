import { Timestamp } from 'firebase/firestore';

export function convertTimestampToDate(timestamp: Timestamp) {
  return new Date(timestamp.toDate());
}
