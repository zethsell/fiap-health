import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class SignInDto {
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsOptional()
  @IsBoolean()
  keepConnected: boolean
}
