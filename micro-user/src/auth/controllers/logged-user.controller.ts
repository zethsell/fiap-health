import { Controller } from '@nestjs/common'
import { LoggedUserService } from '../services'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { LoggedUserDto } from '../dtos/logged-user.dto'

@Controller('api/v1')
export class LoggedUserController {
  constructor(private service: LoggedUserService) {}

  @MessagePattern('user-logged')
  async handle(@Payload() data: LoggedUserDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      return await this.service.run(data)
    } finally {
      await channel.ack(originalMsg)
    }
  }
}
