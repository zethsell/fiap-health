import { Controller } from '@nestjs/common';
import { UserShowService } from '../services';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('api/users')
export class UserShowController {
  constructor(private service: UserShowService) {}

  @MessagePattern('user-show')
  async handle(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      return await this.service.run({ id });
    } finally {
      await channel.ack(originalMsg);
    }
  }
}
