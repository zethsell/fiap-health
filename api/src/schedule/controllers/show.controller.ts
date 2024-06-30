import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ParamValidationPipe } from '../../common/pipes'
import { ClientProxyRMQ } from '../../proxy'
import { catchError } from 'rxjs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('api/schedules')
export class ScheduleShowController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @ApiBearerAuth()
  @ApiTags('Agendamentos')
  @Get('/:id')
  async handle(@Param('id', ParamValidationPipe) id: string) {
    try {
      const instance = this.clientProxy.getInstance('schedules')
      return instance.send('schedule-show', id).pipe(
        catchError((error) => {
          throw error
        }),
      )
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
