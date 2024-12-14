import { Client } from 'pg';
import dbConfig from '../config/database.config';

async function connect() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    console.log('success connect to database!');
  } catch (error: any) {
    console.log(`error connect to database!, ${error?.message}`);
  } finally {
    await client.end();
  }
}

connect();
