import { Pill } from "../../database/entities/pill.entity";
import { PillRepository } from "../../database/repositories/pill.repository";
import { AddNewPillDto, GetPillByNameDto } from "../../types";

export class PillService {
  constructor(private readonly pillRepository: PillRepository) {}

  public async addNewPill(dto: AddNewPillDto) {
    await this.pillRepository.addNewPill(dto);
  }

  public async getPillByName(dto: GetPillByNameDto): Promise<Pill | null> {
    const pill = await this.pillRepository.getPillByName(dto);

    return pill;
  }
}
