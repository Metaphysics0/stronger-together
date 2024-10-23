import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  deleteField,
  deleteDoc,
} from 'firebase/firestore';
import { StrongerTogetherDbUser } from '@/types/models/stronger-together-user.type';
import { UserWorkout } from '@/types/models/user-workout.type';
import { db } from '@/firebaseConfig';

export async function up() {
  const usersRef = collection(db, 'users');
  const usersSnapshot = await getDocs(usersRef);

  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data() as StrongerTogetherDbUser;
    const userId = userDoc.id;

    if (userData.workouts && userData.workouts.length > 0) {
      for (const workout of userData.workouts) {
        const newWorkout: UserWorkout = {
          user_id: userId,
          timestamp: workout.timestamp,
          exercises: workout.exercises,
          notes: workout.notes,
        };

        // Add the workout to the new workouts collection
        await setDoc(
          doc(db, 'workouts', `${userId}_${workout.timestamp.toISOString()}`),
          newWorkout
        );
      }

      // Remove the workouts field from the user document
      await updateDoc(doc(db, 'users', userId), {
        workouts: deleteField(),
      });
    }
  }

  console.log('Migration completed: Workouts moved to separate table');
}

export async function down() {
  const workoutsRef = collection(db, 'workouts');
  const workoutsSnapshot = await getDocs(workoutsRef);

  const userWorkouts: { [userId: string]: UserWorkout[] } = {};

  for (const workoutDoc of workoutsSnapshot.docs) {
    const workoutData = workoutDoc.data() as UserWorkout;
    if (!userWorkouts[workoutData.user_id]) {
      userWorkouts[workoutData.user_id] = [];
    }
    userWorkouts[workoutData.user_id].push(workoutData);
  }

  for (const [userId, workouts] of Object.entries(userWorkouts)) {
    await updateDoc(doc(db, 'users', userId), {
      workouts: workouts,
    });
  }

  // Delete all documents in the workouts collection
  for (const workoutDoc of workoutsSnapshot.docs) {
    await deleteDoc(doc(db, 'workouts', workoutDoc.id));
  }

  console.log('Migration reverted: Workouts moved back to users table');
}
