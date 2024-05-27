import { BadRequestException, Controller, Get } from '@nestjs/common'
import { ClientProxyRMQ } from '../../proxy'

@Controller('api/exams')
export class ExamListController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Get()
  async handle() {
    try {
      const instance = this.clientProxy.getInstance('exams')
      return instance.send('exam-list', {})
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
