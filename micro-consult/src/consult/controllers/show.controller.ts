import { Controller } from '@nestjs/common'
import { ConsultShowService } from '../services'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class ConsultShowController {
  constructor(private service: ConsultShowService) {}

  @MessagePattern('consult-show')
  async handle(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      return await this.service.run({ id })
    } finally {
      await channel.ack(originalMsg)
    }
  }
}
