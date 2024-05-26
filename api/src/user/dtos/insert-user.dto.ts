import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class InsertUserDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  surname: string

  @IsNotEmpty()
  @IsEmail()
  email: string
}
