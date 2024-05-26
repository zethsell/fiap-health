import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'
import { Match } from '../../common/validators'

export class PassRecoveryDto {
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString()
  @MinLength(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e um simbolo!',
  })
  password: string

  @Match('password', { message: 'As senhas divergentes' })
  passwordConfirmation: string

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'O e-mail é inválido' })
  email: string

  @IsNotEmpty({ message: 'O código é obrigatório' })
  code: string
}
