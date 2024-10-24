import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { glob } from 'glob';
import path from 'path';

const DB_MIGRATIONS_GLOB_PATTERN = 'db_migrations/*.ts';

(async () => {
  const direction = getDirectionFromCommandLineArgs();
  await migrateLatest({ direction });
  process.exit(0);
})();

async function migrateLatest({ direction }: { direction: 'up' | 'down' }) {
  try {
    console.log('Searching for latest migration...');

    const migrations = await glob(DB_MIGRATIONS_GLOB_PATTERN);
    const latestMigration = migrations.sort().pop();
    if (!latestMigration) {
      console.log('No migrations found!');
      return;
    }
    console.log(`Migration: ${latestMigration} - In Progress ⏳`);
    const migrationModule = await require(path.resolve(latestMigration));

    const db = getDb();
    if (direction === 'up') {
      console.log('Migrating up...');
      await migrationModule.up({ db });
    } else {
      console.log('Migrating down...');
      await migrationModule.down({ db });
    }
    console.log(`Migration: ${latestMigration} - Completed ✅`);
  } catch (error) {
    console.error(`Error executing migration`, error);
  }
}

function getDb() {
  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
  const app = initializeApp(firebaseConfig);
  return initializeFirestore(app, { cacheSizeBytes: 1048576 });
}

function getDirectionFromCommandLineArgs(): 'up' | 'down' {
  const args = process.argv.slice(2);

  if (args[0] === '--up') return 'up';
  if (args[0] === '--down') return 'down';

  throw new Error('Invalid or missing direction argument! --up or --down');
}
