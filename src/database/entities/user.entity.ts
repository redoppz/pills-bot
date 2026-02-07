import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class User {
  public id!: number;

  public telegramId!: number;

  public username!: string;

  public firstName!: string;

  public lastName!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  public updatedAt!: Date;

  @VersionColumn()
  public version!: number;
}
