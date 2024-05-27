import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { ClientProxyRMQ } from '../../proxy'
import { ParamValidationPipe } from '../../common/pipes'

@Controller('api/consults')
export class ConsultDeleteController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Delete('/:id')
  @HttpCode(204)
  async handle(@Param('id', ParamValidationPipe) id: string) {
    try {
      const instance = this.clientProxy.getInstance('consults')
      instance.emit('consult-delete', id).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
