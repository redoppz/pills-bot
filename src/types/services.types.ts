export class GetPillByNameDto {
  userId!: number;
  name!: string;
}

export class AddNewPillDto {
  name!: string;
  allCount!: string;
  countPerDay!: string;
}

export class CreateNewUserDto {
  telegramId!: number;
  username!: string;
  firstName!: string;
  lastName!: string;
}
