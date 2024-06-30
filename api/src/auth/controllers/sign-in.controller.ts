import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { SignInService } from '../services'
import { SignInDto } from '../dtos'
import { Public } from '../../common/decorators'

@Controller('api/auth')
export class SignInController {
  constructor(private authService: SignInService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInDto: SignInDto) {
    try {
      return this.authService.signIn(signInDto)
    } catch (e) {
      return new UnauthorizedException(e)
    }
  }
}
