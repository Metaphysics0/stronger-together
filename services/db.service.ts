import { db } from '@/firebaseConfig';
import { ExerciseType } from '@/types/exercise.type';
import { UserWorkout } from '@/types/user-workout.type';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

export async function createUser({
  uid,
  displayName,
}: {
  uid: string;
  displayName: string;
}) {
  try {
    await setDoc(doc(db, 'users', uid), {
      displayName,
    });
  } catch (error) {
    console.error('error creating user', error);
  }
}

export async function submitWorkout({
  uid,
  exercise,
  count,
}: {
  uid: string;
  exercise: ExerciseType;
  count: number;
}) {
  try {
    console.log('submitting workout', uid, exercise, count);

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
  } catch (error) {
    console.error('error submitting workout', error);
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

export async function getAllUsers() {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('error getting all users', error);
    return [];
  }
}
