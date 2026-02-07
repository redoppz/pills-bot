import { User } from "../../database/entities/user.entity";
import { UserRepository } from "../../database/repositories/user.repository";
import { CreateNewUserDto } from "../../types";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createNewUser(dto: CreateNewUserDto): Promise<User> {
    return await this.userRepository.createNewUser(dto);
  }
}
