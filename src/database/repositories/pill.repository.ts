import { DataSource } from "typeorm";
import { Pill } from "../entities/pill.entity";
import { AddNewPillDto, GetPillByNameDto } from "../../types";
import { isNull } from "../../utils";

export class PillRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async addNewPill(dto: AddNewPillDto): Promise<void> {
    const { name, allCount, countPerDay } = dto;
    await this.dataSource.query(
      `
      INSERT INTO pill VALUES ($1, $2, $3)
      `,
      [name, allCount, countPerDay],
    );
  }

  public async getPillByName(dto: GetPillByNameDto): Promise<Pill | null> {
    const { userId, name } = dto;
    const [result] = await this.dataSource.query(
      `
      SELECT * FROM pill WHERE user_id = $1 AND name = $2
      `,
      [userId, name],
    );

    if (isNull(result)) {
      return null;
    }

    return PillRepository.map(result);
  }

  private static map(result: any): Pill {
    return {
      id: result.id,
      userId: result.user_id,
      name: result.name,
      allCount: result.all_count,
      currentCount: result.current_count,
      countPerDay: result.count_per_day,
      form: result.form,
      isActive: result.is_active,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      version: result.version,
    };
  }
}
