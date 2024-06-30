import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { InsertScheduleDto } from '../dtos'
import { ClientProxyRMQ } from '../../proxy'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('Agendamentos')
@Controller('api/schedules')
export class ScheduleInsertController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handle(@Body() data: InsertScheduleDto) {
    try {
      const instance = this.clientProxy.getInstance('schedules')
      instance.emit('schedule-store', data).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
