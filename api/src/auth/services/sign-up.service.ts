import { Injectable } from '@nestjs/common'
import { SignUpDto } from '../dtos'
import { GoogleAuthApi } from '../../gateways'
import { RegistrationFailError } from '../../common/errors'
import { ClientProxyRMQ } from '../../proxy'

@Injectable()
export class SignUpService {
  constructor(
    private readonly gcp: GoogleAuthApi,
    private readonly clientProxy: ClientProxyRMQ,
  ) {}

  async signUp(userDTO: SignUpDto) {
    this.saveUserDB(userDTO)
    await this.saveUserGCP(userDTO)
  }

  private saveUserDB(userDTO: SignUpDto) {
    const user = userDTO
    delete user.passwordConfirmation
    const instance = this.clientProxy.getInstance('users')
    instance.emit('user-store', user).subscribe()
  }

  private async saveUserGCP(userDTO: SignUpDto) {
    const result = await this.gcp.signUp({
      email: userDTO.email,
      password: userDTO.password,
    })
    if (result === undefined) throw new RegistrationFailError()
  }
}
