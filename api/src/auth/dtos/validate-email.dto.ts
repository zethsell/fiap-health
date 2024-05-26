import { IsNotEmpty, IsString } from 'class-validator'

export class ValidateEmailDto {
  @IsNotEmpty()
  @IsString()
  code: string
}
