import 'dotenv/config'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'exams', schema: process.env['DB_SCHEMA'] })
export class ExamEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  date?: Date

  @Column({ nullable: true })
  status?: string

  @CreateDateColumn({ nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt?: Date
}
