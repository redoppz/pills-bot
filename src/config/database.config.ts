import { configDotenv } from 'dotenv';
import { User } from '../entities/user.entity';
import { Pill } from '../entities/pill.entity';

configDotenv();

export default {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  synchronize: false,
  entities: [User, Pill],
  migrationsRun: false,
  logging: true,
};
