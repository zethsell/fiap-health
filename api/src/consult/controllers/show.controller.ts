import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ParamValidationPipe } from '../../common/pipes'
import { ClientProxyRMQ } from '../../proxy'
import { catchError } from 'rxjs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('api/consults')
export class ConsultShowController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @ApiBearerAuth()
  @ApiTags('Consultas')
  @Get('/:id')
  async handle(@Param('id', ParamValidationPipe) id: string) {
    try {
      const instance = this.clientProxy.getInstance('consults')
      return instance.send('consult-show', id).pipe(
        catchError((error) => {
          throw error
        }),
      )
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
