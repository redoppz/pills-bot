import { PillForm } from "./database.types";

type BaseUpdatePillDto = {
  id: number;
};

export type AddNewPillDto = {
  name: string;
  allCount: string;
  countPerDay: string;
  form: PillForm;
  userId: number;
};

export type GetAllPillsDto = {
  userId: number;
};

export type GetPillByNameDto = {
  userId: number;
  name: string;
};

export type EditOldPillDto = BaseUpdatePillDto & {
  name: string;
  countPerDay?: string;
  allCount?: string;
};

export type TakePillDto = BaseUpdatePillDto & {
  name: string;
};

export type CreateNewUserDto = {
  telegramId: number;
  username: string;
  firstName: string;
  lastName: string;
};

export type GetUserByTelegramIdDto = Pick<CreateNewUserDto, "telegramId">;
