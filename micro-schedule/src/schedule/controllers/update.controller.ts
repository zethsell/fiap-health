import { Controller } from '@nestjs/common';
import { ScheduleUpdateService } from '../services';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { BaseController } from '../../common/bases/base.controller';
import { UpdateScheduleDto } from '../dtos';
import { RmqChannel } from '../../common/contracts';

@Controller()
export class ScheduleUpdateController extends BaseController {
  constructor(private service: ScheduleUpdateService) {
    super();
  }

  @EventPattern('schedule-update')
  async handle(@Payload() data: UpdateScheduleDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef() as RmqChannel;
    const originalMsg = context.getMessage();
    try {
      await this.service.run(data);
    } catch (error) {
      await this.parseError(error, channel, originalMsg);
    } finally {
      await channel.ack(originalMsg);
    }
  }
}
