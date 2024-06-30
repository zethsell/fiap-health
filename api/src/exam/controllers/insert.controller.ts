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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Exames')
@Controller('api/exams')
export class ExamInsertController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @ApiBearerAuth()
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
