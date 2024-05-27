import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { InsertConsultDto } from '../dtos'
import { ClientProxyRMQ } from '../../proxy'

@Controller('api/consults')
export class ConsultInsertController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handle(@Body() data: InsertConsultDto) {
    try {
      const instance = this.clientProxy.getInstance('consults')
      instance.emit('consult-update', data).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
