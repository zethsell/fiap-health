import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { ClientProxyRMQ } from '../../proxy'
import { ParamValidationPipe } from '../../common/pipes'

@Controller('api/exams')
export class ExamDeleteController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Delete('/:id')
  @HttpCode(204)
  async handle(@Param('id', ParamValidationPipe) id: string) {
    try {
      const instance = this.clientProxy.getInstance('exams')
      instance.emit('exam-delete', id).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
