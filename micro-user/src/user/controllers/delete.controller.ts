import { Controller } from '@nestjs/common';
import { UserDeleteService } from '../services';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { BaseController } from '../../common/bases/base.controller';
import { RmqChannel } from '../../common/contracts';

@Controller()
export class UserDeleteController extends BaseController {
  constructor(private service: UserDeleteService) {
    super();
  }

  @EventPattern('user-delete')
  async handle(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel: RmqChannel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.service.run({ id });
      await channel.ack(originalMsg);
    } catch (error) {
      await this.parseError(error, channel, originalMsg);
    }
  }
}
