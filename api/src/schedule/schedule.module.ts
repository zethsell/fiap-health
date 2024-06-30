import { Module } from '@nestjs/common'
import {
  ScheduleDeleteController,
  ScheduleInsertController,
  ScheduleListController,
  ScheduleShowController,
  ScheduleUpdateController,
} from './controllers'
import { ProxyModule } from '../proxy'

@Module({
  controllers: [
    ScheduleShowController,
    ScheduleListController,
    ScheduleDeleteController,
    ScheduleInsertController,
    ScheduleUpdateController,
  ],
  imports: [ProxyModule],
})
export class ScheduleModule {}
