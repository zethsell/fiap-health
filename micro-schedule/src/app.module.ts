import { Module } from '@nestjs/common';

import { ScheduleModule } from './schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConstant } from './common/constants';

@Module({
  imports: [MongooseModule.forRoot(mongoConstant.url), ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
