import { DataSource } from "typeorm";
import { CreateNewUserDto } from "../../types";
import { User } from "../entities/user.entity";

export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async createNewUser(dto: CreateNewUserDto): Promise<User> {
    const { telegramId, username, firstName, lastName } = dto;
    const result = await this.dataSource.query(
      `
      INSERT INTO user (telegram_id, username, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [telegramId, username, firstName, lastName],
    );

    return result.rows[0];
  }
}
