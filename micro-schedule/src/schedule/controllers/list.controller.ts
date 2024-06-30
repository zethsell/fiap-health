import { Controller } from '@nestjs/common';
import { ScheduleListService } from '../services';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class ScheduleListController {
  constructor(private service: ScheduleListService) {}

  @MessagePattern('schedule-list')
  async handle(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      return await this.service.run();
    } finally {
      await channel.ack(originalMsg);
    }
  }
}
