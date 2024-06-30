import { IsEmail, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  surname: string

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string
}
