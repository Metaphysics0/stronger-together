import { db } from '@/firebaseConfig';
import {
  StrongerTogetherDbUser,
  StrongerTogetherUser,
} from '@/types/models/stronger-together-user.type';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { toastError } from './toast.service';
import { CreateGroupFormState, Group } from '@/types/models/group.type';
import { uploadImageFromDevice } from './upload-image.service';
import { UserWorkout } from '@/types/models/user-workout.type';

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

export async function getUser({
  uid,
}: {
  uid: string;
}): Promise<StrongerTogetherDbUser | null> {
  try {
    const snapshot = await getDoc(doc(db, 'users', uid));
    return snapshot.data() as StrongerTogetherDbUser | null;
  } catch (error) {
    console.error('error getting user', error);
    return null;
  }
}

export async function getUserOrThrow({
  uid,
}: {
  uid: string;
}): Promise<StrongerTogetherDbUser> {
  const user = await getUser({ uid });
  if (!user) throw new Error('User not found');
  return user;
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

export async function createGroup(group: CreateGroupFormState) {
  const groupData: Group = {
    description: group.description,
    groupName: group.groupName,
    visibility: group.visibility,
    members: [],
    groupId: '',
    imageUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const groupRef = doc(collection(db, 'groups'));
  const groupId = groupRef.id;

  if (group.image) {
    const storageRef = await uploadImageFromDevice({
      path: `groups/${groupId}/config`,
      imageUri: group.image,
    });
    if (storageRef) {
      groupData.imageUrl = storageRef.fullPath;
    }
  }

  await setDoc(groupRef, groupData);
}

export async function getAllWorkoutsSortedByTimestamp(): Promise<
  (UserWorkout & { userId: string; userDisplayName: string })[]
> {
  try {
    const users = await getAllUsers();
    console.log(
      'user ids',
      users.map((user) => user.uid)
    );

    const allWorkouts = users.flatMap((user) =>
      user.workouts.map((workout) => ({
        ...workout,
        userId: user.uid,
        userDisplayName: user.displayName,
      }))
    );

    return allWorkouts.sort(
      (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
    );
  } catch (error) {
    console.error('error getting all workouts', error);
    toastError('Error getting workouts!');
    return [];
  }
}

// export async function likeWorkout(workoutId: string, userId: string) {
//   await updateDoc(doc(db, 'workouts', workoutId), {
//     likes: [...(workout.likes || []), { user_id: userId }],
//   });
// }
