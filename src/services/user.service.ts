import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  public async getUserByUserName(username: string): Promise<User> {
    const [user] = (await this.userRepository.find({
      where: { username },
    })) ?? [undefined];

    if (!user) {
      await this.userRepository.insert({ username });
    }

    const [newUser] = (await this.userRepository.find({
      where: { username },
    })) ?? [undefined];

    console.log(`get usernameId ${user ?? newUser} by username ${username}`);

    return user ?? newUser;
  }
}
