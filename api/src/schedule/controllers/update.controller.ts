import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UpdateScheduleDto } from '../dtos'
import { ParamValidationPipe } from '../../common/pipes'
import { ClientProxyRMQ } from '../../proxy'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('Agendamentos')
@Controller('api/schedules')
export class ScheduleUpdateController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async handle(
    @Body() input: UpdateScheduleDto,
    @Param('id', ParamValidationPipe) id: string,
  ) {
    try {
      const data = Object.assign({}, input, { id })
      const instance = this.clientProxy.getInstance('schedules')
      instance.emit('schedule-update', data).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
