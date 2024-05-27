import { Module } from '@nestjs/common'
import {
  ExamDeleteController,
  ExamInsertController,
  ExamListController,
  ExamShowController,
  ExamUpdateController,
} from './controllers'
import { ProxyModule } from '../proxy'

@Module({
  controllers: [
    ExamShowController,
    ExamListController,
    ExamDeleteController,
    ExamInsertController,
    ExamUpdateController,
  ],
  imports: [ProxyModule],
})
export class ExamModule {}
