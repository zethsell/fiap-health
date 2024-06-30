import { Controller } from '@nestjs/common';
import { ScheduleDeleteService } from '../services';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { BaseController } from '../../common/bases/base.controller';
import { RmqChannel } from '../../common/contracts';

@Controller()
export class ScheduleDeleteController extends BaseController {
  constructor(private service: ScheduleDeleteService) {
    super();
  }

  @EventPattern('schedule-delete')
  async handle(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel: RmqChannel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.service.run({ id });
    } catch (error) {
      await this.parseError(error, channel, originalMsg);
    } finally {
      await channel.ack(originalMsg);
    }
  }
}
