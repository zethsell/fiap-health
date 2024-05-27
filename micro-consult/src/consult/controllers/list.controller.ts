import { Controller } from '@nestjs/common'
import { ConsultListService } from '../services'
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices'

@Controller()
export class ConsultListController {
  constructor(private service: ConsultListService) {}

  @MessagePattern('consult-list')
  async handle(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      return await this.service.run()
    } finally {
      await channel.ack(originalMsg)
    }
  }
}
