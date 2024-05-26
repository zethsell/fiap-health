import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UpdateUserDto } from '../dtos'
import { ParamValidationPipe } from '../../common/pipes'
import { ClientProxyRMQ } from '../../proxy'

@Controller('api/users')
export class UserUpdateController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async handle(
    @Body() input: UpdateUserDto,
    @Param('id', ParamValidationPipe) id: string,
  ) {
    try {
      const data = Object.assign({}, input, { id: Number.parseInt(id) })
      const instance = this.clientProxy.getInstance('users')
      instance.emit('user-update', data).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
