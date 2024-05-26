import { Controller } from '@nestjs/common';
import { UserListService } from '../services';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class UserListController {
  constructor(private service: UserListService) {}

  @MessagePattern('user-list')
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
