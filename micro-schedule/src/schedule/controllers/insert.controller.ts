import { Controller } from '@nestjs/common';
import { ScheduleInsertService } from '../services';
import { InsertScheduleDto } from '../dtos';
import { BaseController } from '../../common/bases/base.controller';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class ScheduleInsertController extends BaseController {
  constructor(private service: ScheduleInsertService) {
    super();
  }

  @EventPattern('schedule-store')
  async handle(
    @Payload() schedule: InsertScheduleDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.service.run(schedule);
    } catch (error) {
      await this.parseError(error, channel, originalMsg);
    } finally {
      await channel.ack(originalMsg);
    }
  }
}
