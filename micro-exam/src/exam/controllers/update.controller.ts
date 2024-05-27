import { Controller } from '@nestjs/common'
import { ExamUpdateService } from '../services'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { BaseController } from '../../common/bases/base.controller'
import { UpdateExamDto } from '../dtos'

@Controller()
export class ExamUpdateController extends BaseController {
  constructor(private service: ExamUpdateService) {
    super()
  }

  @EventPattern('exam-update')
  async handle(@Payload() data: UpdateExamDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      await this.service.run(data)
    } catch (error) {
      await this.parseError(error, channel, originalMsg)
    } finally {
      await channel.ack(originalMsg)
    }
  }
}
