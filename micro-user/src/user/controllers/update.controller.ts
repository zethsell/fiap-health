import { Controller } from '@nestjs/common';
import { UserUpdateService } from '../services';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { BaseController } from '../../common/bases/base.controller';
import { UpdateUserDto } from '../dtos';

@Controller()
export class UserUpdateController extends BaseController {
  constructor(private service: UserUpdateService) {
    super();
  }

  @EventPattern('user-update')
  async handle(@Payload() data: UpdateUserDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
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
