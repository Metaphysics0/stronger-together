import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  deleteField,
  addDoc,
} from 'firebase/firestore';
import { StrongerTogetherDbUser } from '@/types/models/stronger-together-user.type';
import { UserWorkout } from '@/types/models/user-workout.type';
import { Firestore } from 'firebase/firestore';

export async function up({ db }: { db: Firestore }) {
  const usersSnapshot = await getDocs(collection(db, 'users'));

  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data() as StrongerTogetherDbUser;
    const userId = userDoc.id;

    if (userData.workouts && userData.workouts.length > 0) {
      for (const workout of userData.workouts) {
        const newWorkout: UserWorkout & { user_id: string } = {
          user_id: userId,
          timestamp: new Date(),
          exercises: workout?.exercises ?? [],
          notes: workout?.notes ?? '',
        };

        // // Add the workout to the new workouts collection
        await addDoc(collection(db, 'workouts'), newWorkout);
      }

      // Remove the workouts field from the user document
      await updateDoc(doc(db, 'users', userId), {
        workouts: deleteField(),
      });
    }
  }
}

export async function down({ db }: { db: Firestore }) {
  const workoutsRef = collection(db, 'workouts');
  const workoutsSnapshot = await getDocs(workoutsRef);

  const userWorkouts: { [userId: string]: UserWorkout[] } = {};

  for (const workoutDoc of workoutsSnapshot.docs) {
    const workoutData = workoutDoc.data() as UserWorkout & { user_id: string };
    if (!userWorkouts[workoutData?.user_id]) {
      userWorkouts[workoutData?.user_id] = [];
    }
    if (workoutData.exercises?.length === 0) {
      continue;
    }

    userWorkouts[workoutData?.user_id].push(workoutData);
  }

  for (const [userId, workouts] of Object.entries(userWorkouts)) {
    console.log(
      `down - updating user ${userId} with ${workouts.length} workouts`
    );

    await updateDoc(doc(db, 'users', userId), { workouts });
  }

  // Delete all documents in the workouts collection
  console.log(`down - deleting ${workoutsSnapshot.docs.length} workouts`);
  await deleteWorkouts(db);

  console.log('Migration reverted: Workouts moved back to users table');
}

async function deleteWorkouts(db: Firestore) {
  const workoutsRef = collection(db, 'workouts');
  const workoutsSnapshot = await getDocs(workoutsRef);

  for (const workoutDoc of workoutsSnapshot.docs) {
    await deleteDoc(doc(db, 'workouts', workoutDoc.id));
  }
}
