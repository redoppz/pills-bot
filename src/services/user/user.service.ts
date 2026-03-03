import { inject, injectable, registry } from "tsyringe";
import { User } from "../../../generated/prisma/client";
import { UserRepository } from "../../database/repositories/user.repository";
import { CreateNewUserDto, GetUserByTelegramIdDto } from "../../types";
import { isNull } from "../../utils";

@injectable()
@registry([
  {
    token: "UserRepository",
    useClass: UserRepository,
  },
])
export class UserService {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository,
  ) {}

  public async createNewUser(dto: CreateNewUserDto): Promise<User> {
    const { telegramId } = dto;
    const user = await this.getUserByTelegramId({ telegramId });

    if (isNull(user)) {
      return await this.userRepository.createNewUser(dto);
    }

    return user;
  }

  private async getUserByTelegramId(
    dto: GetUserByTelegramIdDto,
  ): Promise<User | null> {
    return await this.userRepository.getUserByTelegramId(dto);
  }
}
