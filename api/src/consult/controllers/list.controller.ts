import { BadRequestException, Controller, Get } from '@nestjs/common'
import { ClientProxyRMQ } from '../../proxy'

@Controller('api/consults')
export class ConsultListController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Get()
  async handle() {
    try {
      const instance = this.clientProxy.getInstance('consults')
      return instance.send('consult-list', {})
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
