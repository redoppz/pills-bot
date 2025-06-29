import { Repository } from "typeorm";
import { Pill } from "../entities";
import { IPillData } from "./types";
import { UserService } from "./user.service";

export class PillService {
  constructor(
    private pillRepository: Repository<Pill>,
    private userService: UserService
  ) {}

  public async addPill(username: string, pillData: IPillData): Promise<void> {
    const { pillName, pillCount, pillCountPerDay } = pillData;
    const user = await this.userService.getUserByUserName(username);
    console.log("user", user);

    await this.pillRepository.insert({
      name: pillName,
      count: pillCount,
      countPerDay: pillCountPerDay,
    });
  }

  public async countPill(
    username: string,
    pillData: IPillData
  ): Promise<Pill[]> {
    const { pillName } = pillData;
    const user = await this.userService.getUserByUserName(username);

    return await this.pillRepository.find({
      select: ["count"],
      where: { name: pillName, user },
    });
  }

  public async takePill(username: string, pillData: IPillData): Promise<void> {
    const { pillName } = pillData;
    const user = await this.userService.getUserByUserName(username);
    console.log(user);

    await this.pillRepository.update(pillName, { count: 10 });
  }

  public async editPill(username: string, pillData: IPillData): Promise<void> {
    const { pillName } = pillData;
    const user = await this.userService.getUserByUserName(username);
    console.log(user);

    await this.pillRepository.update(pillName, { count: 10 });
  }
}
