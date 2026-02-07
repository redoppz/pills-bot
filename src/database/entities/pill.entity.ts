import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import type { PillForm } from "../../types";

@Entity()
export class Pill {
  @PrimaryGeneratedColumn("uuid")
  public id!: number;

  public userId!: number;

  public name!: string;

  public allCount!: string;

  public currentCount!: number;

  public countPerDay!: string;

  public form!: PillForm;

  public isActive!: boolean;

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
