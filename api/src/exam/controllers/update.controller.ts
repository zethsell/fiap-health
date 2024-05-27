import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UpdateExamDto } from '../dtos'
import { ParamValidationPipe } from '../../common/pipes'
import { ClientProxyRMQ } from '../../proxy'

@Controller('api/exams')
export class ExamUpdateController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async handle(
    @Body() input: UpdateExamDto,
    @Param('id', ParamValidationPipe) id: string,
  ) {
    try {
      const data = Object.assign({}, input, { id: Number.parseInt(id) })
      const instance = this.clientProxy.getInstance('exams')
      instance.emit('exam-update', data).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
