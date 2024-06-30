import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { SignUpService } from '../services'
import { SignUpDto } from '../dtos'
import { Public } from '../../common/decorators'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Autenticação')
@Controller('api/auth')
export class SignUpController {
  constructor(private authService: SignUpService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @Post('sign-up')
  @UsePipes(ValidationPipe)
  signup(@Body() signUpDto: SignUpDto) {
    try {
      return this.authService.signUp(signUpDto)
    } catch (e) {
      return new BadRequestException(e)
    }
  }
}
