import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UniqueValidator } from '../../common/validators';
import { UserEntity } from '../../database/entities';

export class InsertUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  @UniqueValidator(UserEntity, 'email')
  email: string;
}
