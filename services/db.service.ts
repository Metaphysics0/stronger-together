import { db } from '@/firebaseConfig';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

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
