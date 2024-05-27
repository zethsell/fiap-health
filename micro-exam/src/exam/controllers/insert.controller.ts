import { Controller } from '@nestjs/common'
import { ExamInsertService } from '../services'
import { InsertExamDto } from '../dtos'
import { BaseController } from '../../common/bases/base.controller'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class ExamInsertController extends BaseController {
  constructor(private service: ExamInsertService) {
    super()
  }

  @EventPattern('exam-store')
  async handle(@Payload() consult: InsertExamDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      await this.service.run(consult)
    } catch (error) {
      await this.parseError(error, channel, originalMsg)
    } finally {
      await channel.ack(originalMsg)
    }
  }
}
