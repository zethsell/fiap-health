import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database'
import { ExamRepository } from './exam.repository'
import {
  ExamDeleteService,
  ExamInsertService,
  ExamListService,
  ExamShowService,
  ExamUpdateService,
} from './services'
import {
  ExamDeleteController,
  ExamInsertController,
  ExamListController,
  ExamShowController,
  ExamUpdateController,
} from './controllers'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ExamDeleteController,
    ExamUpdateController,
    ExamInsertController,
    ExamShowController,
    ExamListController,
  ],
  providers: [
    ExamDeleteService,
    ExamUpdateService,
    ExamInsertService,
    ExamShowService,
    ExamListService,
    ExamRepository,
  ],
  exports: [ExamRepository],
})
export class ExamModule {}
