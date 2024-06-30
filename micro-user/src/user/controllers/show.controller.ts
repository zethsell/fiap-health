import { Controller } from '@nestjs/common'
import { UserShowService } from '../services'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class UserShowController {
  constructor(private service: UserShowService) {}

  @MessagePattern('user-show')
  async handle(@Payload() id: string, @Ctx() context: RmqContext) {
    console.log(id, context)
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      return await this.service.run({ id })
    } finally {
      await channel.ack(originalMsg)
    }
  }

  @MessagePattern('user-show-email')
  async showByEmail(@Payload() email: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      return await this.service.showByEmail({ email })
    } finally {
      await channel.ack(originalMsg)
    }
  }
}
