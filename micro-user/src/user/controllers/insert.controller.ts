import { Controller } from '@nestjs/common';
import { UserInsertService } from '../services';
import { InsertUserDto } from '../dtos';
import { BaseController } from '../../common/bases/base.controller';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class UserInsertController extends BaseController {
  constructor(private service: UserInsertService) {
    super();
  }

  @EventPattern('user-store')
  async handle(@Payload() user: InsertUserDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.service.run(user);
    } catch (error) {
      await this.parseError(error, channel, originalMsg);
    } finally {
      await channel.ack(originalMsg);
    }
  }
}
