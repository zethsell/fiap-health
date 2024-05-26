import 'dotenv/config';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserAuthEntity } from '.';

@Entity({ name: 'users', schema: process.env['DB_SCHEMA'] })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ nullable: true })
  accessAt?: Date;

  @Column({ nullable: true })
  lastAccessAt?: Date;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt?: Date;

  @OneToOne(() => UserAuthEntity, (userAuth) => userAuth.user, { eager: true })
  auth?: UserAuthEntity;
}
