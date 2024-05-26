import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  name: string

  @IsString()
  surname: string

  @IsOptional()
  @IsEmail()
  email: string
}
