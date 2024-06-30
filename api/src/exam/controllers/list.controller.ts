import { BadRequestException, Controller, Get } from '@nestjs/common'
import { ClientProxyRMQ } from '../../proxy'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('api/exams')
export class ExamListController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @ApiBearerAuth()
  @ApiTags('Exames')
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
