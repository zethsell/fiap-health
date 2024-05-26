import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { InsertUserDto } from '../dtos'
import { ClientProxyRMQ } from '../../proxy'

@Controller('api/users')
export class UserInsertController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handle(@Body() data: InsertUserDto) {
    try {
      const instance = this.clientProxy.getInstance('users')
      instance.emit('user-update', data).subscribe()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
