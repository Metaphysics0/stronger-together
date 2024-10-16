import { db } from '@/firebaseConfig';
import { ExerciseType } from '@/types/exercise.type';
import { StrongerTogetherUser } from '@/types/stronger-together-user.type';
import { UserWorkout } from '@/types/user-workout.type';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { toastError } from './toast.service';
import { sendPushNotification } from './push-notifications/send-push-notification.service';
import { getWorkoutPushNotificationMessage } from '@/utils/get-workout-push-notification-message.util';

export async function createUser({
  uid,
  data,
}: {
  uid: string;
  data: Partial<StrongerTogetherUser>;
}) {
  try {
    console.log('creating user', uid, data);
    await setDoc(doc(db, 'users', uid), { ...data }, { merge: true });
  } catch (error) {
    console.error('error creating user', error);
  }
}

export async function submitWorkout({
  uid,
  exercise,
  count,
  expoPushToken,
}: {
  uid: string;
  exercise: ExerciseType;
  count: number;
  expoPushToken: string;
}) {
  try {
    console.log(`submitting workout for user: ${uid} - ${count} ${exercise}`);

    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const user = userDoc.data();
    const { workouts: existingWorkouts = [] } = user;

    const workout: UserWorkout = {
      exercise,
      count,
      timestamp: new Date(),
    };

    await updateDoc(doc(db, 'users', uid), {
      workouts: [...existingWorkouts, workout],
    });

    await sendPushNotification({
      expoPushToken,
      ...getWorkoutPushNotificationMessage({
        userDisplayName: user.displayName,
        exercise,
        count,
      }),
    });
  } catch (error) {
    console.error('error submitting workout', error);
    toastError('Error submitting workout');
  }
}

export async function getUser({ uid }: { uid: string }) {
  try {
    const snapshot = await getDoc(doc(db, 'users', uid));
    return snapshot.data();
  } catch (error) {
    console.error('error getting user', error);
    return null;
  }
}

export async function getAllUsers(): Promise<
  Array<{ uid: string } & StrongerTogetherUser>
> {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    const users = snapshot.docs.map((doc) => {
      const json = doc.data();
      return {
        ...json,
        workouts: json.workouts ?? [],
        displayName: json.displayName,
        uid: doc.id,
      };
    });
    return users as unknown as Array<{ uid: string } & StrongerTogetherUser>;
  } catch (error) {
    console.error('error getting all users', error);
    toastError('Error getting users!');
    return [];
  }
}

export async function getAllWeeklyWorkouts(start: Date, end: Date) {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const workoutsPromises = usersSnapshot.docs.map(async (userDoc) => {
      const userWorkoutsSnapshot = await getDocs(
        query(
          collection(db, 'users', userDoc.id, 'workouts'),
          where('timestamp', '>=', start),
          where('timestamp', '<=', end)
        )
      );
      return userWorkoutsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        userId: userDoc.id,
      }));
    });

    const allWorkouts = await Promise.all(workoutsPromises);
    return allWorkouts.flat();
  } catch (error) {
    console.error('error getting all weekly workouts', error);
    return [];
  }
}
