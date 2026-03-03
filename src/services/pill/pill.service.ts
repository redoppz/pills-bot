import { inject, injectable, registry } from "tsyringe";
import { Pill } from "../../../generated/prisma/client";
import { PillRepository } from "../../database/repositories/pill.repository";
import {
  AddNewPillDto,
  EditOldPillDto,
  GetPillByNameDto,
  TakePillDto,
} from "../../types";
import { GetAllPillsDto } from "../../types/services.types";

@injectable()
@registry([
  {
    token: "PillRepository",
    useClass: PillRepository,
  },
])
export class PillService {
  constructor(
    @inject("PillRepository") private readonly pillRepository: PillRepository,
  ) {}

  public async addNewPill(dto: AddNewPillDto): Promise<void> {
    await this.pillRepository.addNewPill(dto);
  }

  public async getAllPills(dto: GetAllPillsDto): Promise<Pill[]> {
    const pills = await this.pillRepository.getAllPills(dto);

    return pills;
  }

  public async getPillByName(dto: GetPillByNameDto): Promise<Pill | null> {
    const pill = await this.pillRepository.getPillByName(dto);

    return pill;
  }

  public async editOldPill(dto: EditOldPillDto): Promise<Pill> {
    const editedPill = await this.pillRepository.editOldPill(dto);

    return editedPill;
  }

  public async takePill(dto: TakePillDto): Promise<Pill> {
    const takedPill = await this.pillRepository.takePill(dto);

    return takedPill;
  }
}
