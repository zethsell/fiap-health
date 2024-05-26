import { IsNotEmpty, IsObject, IsString } from 'class-validator'
import { User } from '../../user/contracts'

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refresh_token: string

  @IsNotEmpty()
  @IsObject()
  user: User
}
