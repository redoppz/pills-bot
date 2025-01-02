import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pill } from './pill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public username!: string;

  @OneToMany(() => Pill, (pill) => pill.user)
  public pills!: Pill[];
}
