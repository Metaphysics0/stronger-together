import { db } from '@/firebaseConfig';
import { StrongerTogetherUser } from '@/types/stronger-together-user.type';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { toastError } from './toast.service';
import { Group } from '@/types/group.type';

export async function createUser({
  uid,
  data,
}: {
  uid: string;
  data: Partial<StrongerTogetherUser>;
}) {
  try {
    console.log('upserting user', uid, data);
    await setDoc(doc(db, 'users', uid), { ...data }, { merge: true });
  } catch (error) {
    console.error('error creating user', error);
  }
}

export async function updateUser({
  uid,
  data,
}: {
  uid: string;
  data: Partial<StrongerTogetherUser>;
}) {
  await updateDoc(doc(db, 'users', uid), data);
}

export async function updateUserPushToken({
  uid,
  expoPushToken,
}: {
  uid: string;
  expoPushToken: string;
}) {
  console.log('updating user push token', uid);
  await updateUser({ uid, data: { expoPushToken } });
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

export async function getAllPushTokens(): Promise<string[]> {
  const users = await getAllUsers();
  return users
    .map((user) => user.expoPushToken)
    .filter((token): token is string => token !== null);
}

export async function getGroups(): Promise<Group[]> {
  try {
    const snapshot = await getDocs(collection(db, 'groups'));
    return snapshot.docs.map((doc) => doc.data()) as Group[];
  } catch (error) {
    console.error('error getting groups', error);
    return [];
  }
}
