import { Controller } from '@nestjs/common'
import { ExamShowService } from '../services'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class ExamShowController {
  constructor(private service: ExamShowService) {}

  @MessagePattern('exam-show')
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
