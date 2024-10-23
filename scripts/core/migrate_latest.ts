import { glob } from 'glob';
import path from 'path';

async function migrateLatest() {
  const migrations = await glob('db_migrations/*.ts');
  const latestMigration = migrations.sort().pop();
  if (!latestMigration) {
    console.log('No migrations found');
    return;
  }

  try {
    const migrationModule = await require(path.resolve(latestMigration));
    if (typeof migrationModule.up === 'function') {
      console.log(`Migration ${latestMigration} executed successfully.`);
    } else {
      console.error(
        `Migration ${latestMigration} does not have an 'up' function.`
      );
    }
  } catch (error) {
    console.error(`Error executing migration ${latestMigration}:`, error);
  }
}

migrateLatest();
