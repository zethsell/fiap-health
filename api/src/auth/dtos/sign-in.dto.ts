import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  keepConnected: boolean
}
