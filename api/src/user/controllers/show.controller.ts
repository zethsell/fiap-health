import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ParamValidationPipe } from '../../common/pipes'
import { ClientProxyRMQ } from '../../proxy'
import { catchError } from 'rxjs'

@Controller('api/users')
export class UserShowController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Get('/:id')
  async handle(@Param('id', ParamValidationPipe) id: string) {
    try {
      const instance = this.clientProxy.getInstance('users')
      return instance.send('user-show', id).pipe(
        catchError((error) => {
          throw error
        }),
      )
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
