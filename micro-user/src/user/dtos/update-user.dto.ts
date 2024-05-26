import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { UniqueValidator } from '../../common/validators';
import { UserEntity } from '../../database/entities';

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsOptional()
  @IsEmail()
  @UniqueValidator(UserEntity, 'email')
  email: string;
}
