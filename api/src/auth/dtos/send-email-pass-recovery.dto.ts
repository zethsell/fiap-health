import { IsEmail, IsNotEmpty } from 'class-validator'

export class SendEmailPassRecoveryDto {
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'O e-mail é inválido' })
  email: string
}
