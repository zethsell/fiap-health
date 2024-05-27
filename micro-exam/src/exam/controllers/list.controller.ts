import { Controller } from '@nestjs/common'
import { ExamListService } from '../services'
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices'

@Controller()
export class ExamListController {
  constructor(private service: ExamListService) {}

  @MessagePattern('exam-list')
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
