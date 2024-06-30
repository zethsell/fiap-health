import { Module } from '@nestjs/common';
import { scheduleSchema } from '../database/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ScheduleDeleteService,
  ScheduleInsertService,
  ScheduleListService,
  ScheduleShowService,
  ScheduleUpdateService,
} from './services';
import { ScheduleRepository } from './schedule.repository';
import {
  ScheduleDeleteController,
  ScheduleInsertController,
  ScheduleListController,
  ScheduleShowController,
  ScheduleUpdateController,
} from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Schedule', schema: scheduleSchema }]),
  ],
  controllers: [
    ScheduleDeleteController,
    ScheduleUpdateController,
    ScheduleInsertController,
    ScheduleShowController,
    ScheduleListController,
  ],
  providers: [
    ScheduleDeleteService,
    ScheduleUpdateService,
    ScheduleInsertService,
    ScheduleShowService,
    ScheduleListService,
    ScheduleRepository,
  ],
})
export class ScheduleModule {}
