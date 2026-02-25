import { User } from "../../../generated/prisma/client";
import { CreateNewUserDto, GetUserByTelegramIdDto } from "../../types";
import { PrismaService } from "../prisma";

export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async createNewUser(dto: CreateNewUserDto): Promise<User> {
    const { telegramId, username, firstName, lastName } = dto;
    const createdUser = await this.prismaService.user.create({
      data: {
        telegramId: String(telegramId),
        username,
        firstName,
        lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
      },
    });

    return createdUser;
  }

  public async getUserByTelegramId(
    dto: GetUserByTelegramIdDto,
  ): Promise<User | null> {
    const { telegramId } = dto;
    const user = await this.prismaService.user.findFirst({
      where: { telegramId: String(telegramId) },
    });

    return user;
  }
}
