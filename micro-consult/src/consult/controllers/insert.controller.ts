import { Controller } from '@nestjs/common'
import { ConsultInsertService } from '../services'
import { InsertConsultDto } from '../dtos'
import { BaseController } from '../../common/bases/base.controller'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class ConsultInsertController extends BaseController {
  constructor(private service: ConsultInsertService) {
    super()
  }

  @EventPattern('consult-store')
  async handle(
    @Payload() consult: InsertConsultDto,
    @Ctx() context: RmqContext,
  ) {
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
