import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { InsertExamDto } from '../dtos'
import { ClientProxyRMQ } from '../../proxy'

@Controller('api/exams')
export class ExamInsertController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handle(@Body() data: InsertExamDto) {
    try {
      const instance = this.clientProxy.getInstance('exams')
      instance.emit('exam-store', data).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
