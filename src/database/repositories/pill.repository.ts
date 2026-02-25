import { Pill } from "../../../generated/prisma/client";
import {
  AddNewPillDto,
  EditOldPillDto,
  GetPillByNameDto,
  TakePillDto,
} from "../../types";
import { GetAllPillsDto } from "../../types/services.types";
import { PrismaService } from "../prisma";

export class PillRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async addNewPill(dto: AddNewPillDto): Promise<void> {
    const { name, allCount, countPerDay, form, userId } = dto;
    await this.prismaService.pill.create({
      data: {
        name,
        allCount: Number(allCount),
        currentCount: Number(allCount),
        countPerDay: Number(countPerDay),
        form,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        userId,
      },
    });
  }

  public async getAllPills(dto: GetAllPillsDto): Promise<Pill[]> {
    const { userId } = dto;
    const pills = await this.prismaService.pill.findMany({
      where: {
        userId,
      },
    });

    return pills;
  }

  public async getPillByName(dto: GetPillByNameDto): Promise<Pill | null> {
    const { userId, name } = dto;
    const result = await this.prismaService.pill.findFirst({
      where: {
        name,
        userId,
      },
    });

    return result;
  }

  public async editOldPill(dto: EditOldPillDto): Promise<Pill> {
    const { id, name, countPerDay, allCount } = dto;
    let result: Pill | undefined;

    if (countPerDay) {
      result = await this.prismaService.pill.update({
        where: { id, name },
        data: {
          countPerDay: Number(countPerDay),
        },
      });
    }

    if (allCount) {
      result = await this.prismaService.pill.update({
        where: { id, name },
        data: {
          allCount: Number(allCount),
        },
      });
    }

    return result!;
  }

  public async takePill(dto: TakePillDto): Promise<Pill> {
    const { id, name } = dto;

    return await this.prismaService.pill.update({
      where: { id, name },
      data: {
        allCount: 0,
      },
    });
  }
}
