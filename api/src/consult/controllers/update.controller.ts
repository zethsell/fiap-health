import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UpdateConsultDto } from '../dtos'
import { ParamValidationPipe } from '../../common/pipes'
import { ClientProxyRMQ } from '../../proxy'

@Controller('api/consults')
export class ConsultUpdateController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async handle(
    @Body() input: UpdateConsultDto,
    @Param('id', ParamValidationPipe) id: string,
  ) {
    try {
      const data = Object.assign({}, input, { id: Number.parseInt(id) })
      const instance = this.clientProxy.getInstance('consults')
      instance.emit('consult-update', data).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
