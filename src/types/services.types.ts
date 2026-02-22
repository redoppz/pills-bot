import { PillForm } from "./database.types";

export class AddNewPillDto {
  name!: string;
  allCount!: string;
  countPerDay!: string;
  form!: PillForm;
}

export class GetAllPillsDto {
  userId!: number;
}

export class GetPillByNameDto {
  userId!: number;
  name!: string;
}

export class EditOldPillDto {
  name!: string;
  countPerDay?: string;
  allCount?: string;
}

export class TakePillDto {
  name!: string;
}

export class CreateNewUserDto {
  telegramId!: number;
  username!: string;
  firstName!: string;
  lastName!: string;
}
