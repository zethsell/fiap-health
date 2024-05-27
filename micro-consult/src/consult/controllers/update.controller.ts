import { Controller } from '@nestjs/common'
import { ConsultUpdateService } from '../services'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { BaseController } from '../../common/bases/base.controller'
import { UpdateConsultDto } from '../dtos'

@Controller()
export class ConsultUpdateController extends BaseController {
  constructor(private service: ConsultUpdateService) {
    super()
  }

  @EventPattern('consult-update')
  async handle(@Payload() data: UpdateConsultDto, @Ctx() context: RmqContext) {
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
