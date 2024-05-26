import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'
import { Match } from '../../common/validators'

export class SignUpDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  name: string

  @IsNotEmpty({ message: 'O sobrenome  é obrigatório' })
  @IsString()
  surname: string

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString()
  @MinLength(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número, um simbolo e no minimo 8 caracteres!',
  })
  password: string

  @Match('password')
  passwordConfirmation: string

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'O e-mail é inválido' })
  email: string
}
