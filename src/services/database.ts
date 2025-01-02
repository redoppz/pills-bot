import { DataSource } from 'typeorm';
import dbConfig from '../config/database.config';
import { IPillData } from './types';
import { Pill } from '../entities/pill.entity';
import { User } from '../entities/user.entity';

const AppDataSource = new DataSource({ type: 'postgres', ...dbConfig });

AppDataSource.initialize()
  .then(() => {
    console.log('Data source has been initialized!');
  })
  .catch((err) =>
    console.error('Error during Data Source initialization', err)
  );

export async function addPill(
  username: string,
  pillData: IPillData
): Promise<void> {
  const user = await getUserByUserName(username);
  const { pillName, pillCount, pillCountPerDay } = pillData;

  await AppDataSource.getRepository(Pill).insert({
    name: pillName,
    count: pillCount,
    countPerDay: pillCountPerDay,
    user: user,
  });
}

export async function countPill(username: string, pillName: string) {
  const user = await getUserByUserName(username);
  return await AppDataSource.getRepository(Pill).find({
    select: ['count'],
    where: { name: pillName, user },
  });
}

export async function takePill(
  username: string,
  pillName: string
): Promise<void> {
  const user = await getUserByUserName(username);
  console.log(user);
  await AppDataSource.getRepository(Pill).update(pillName, { count: 10 });
}

export async function editPill(
  username: string,
  pillName: string
): Promise<void> {
  const user = await getUserByUserName(username);
  console.log(user);
  await AppDataSource.getRepository(Pill).update(pillName, { count: 10 });
}

async function getUserByUserName(username: string): Promise<User> {
  const [user] = (await AppDataSource.getRepository(User).find({
    where: { username },
  })) ?? [undefined];

  if (!user) {
    await AppDataSource.getRepository(User).insert({ username });
  }

  const [newUser] = (await AppDataSource.getRepository(User).find({
    where: { username },
  })) ?? [undefined];

  console.log(`get usernameId ${user ?? newUser} by username ${username}`);

  return user ?? newUser;
}
