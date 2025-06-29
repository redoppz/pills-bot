import "reflect-metadata";
import { BotManager } from "./src/services";
import { PillService } from "./src/services/pill.service";
import { AppDataSource, Pill, User } from "./src/entities";
import { UserService } from "./src/services/user.service";

const pillRepository = AppDataSource.getRepository(Pill);
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const pillService = new PillService(pillRepository, userService);
const bot = new BotManager(pillService);
bot.start();
