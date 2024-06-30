import { BadRequestException, Controller, Get } from '@nestjs/common'
import { ClientProxyRMQ } from '../../proxy'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('api/users')
export class UserListController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @ApiBearerAuth()
  @ApiTags('Usuários')
  @Get()
  async handle() {
    try {
      const instance = this.clientProxy.getInstance('users')
      return instance.send('user-list', {})
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
