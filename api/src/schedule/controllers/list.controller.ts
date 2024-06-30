import { BadRequestException, Controller, Get } from '@nestjs/common'
import { ClientProxyRMQ } from '../../proxy'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('api/schedules')
export class ScheduleListController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @ApiBearerAuth()
  @ApiTags('Agendamentos')
  @Get()
  async handle() {
    try {
      const instance = this.clientProxy.getInstance('schedules')
      return instance.send('schedule-list', {})
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
