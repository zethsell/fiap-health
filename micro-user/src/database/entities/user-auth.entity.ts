import 'dotenv/config';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '.';

@Entity({ name: 'users-auth', schema: process.env['DB_SCHEMA'] })
export class UserAuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  code?: string;

  @Column({ nullable: true })
  codeValidateAt?: Date;

  @Column({ nullable: true })
  codeExpiresAt?: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user?: UserEntity;
}
