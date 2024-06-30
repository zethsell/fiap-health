import { Injectable } from '@nestjs/common'
import { SignInDto } from '../dtos'
import { GoogleAuthApi } from '../../gateways'
import { ClientProxyRMQ } from '../../proxy'

@Injectable()
export class SignInService {
  constructor(
    private readonly gcp: GoogleAuthApi,
    private readonly clientProxy: ClientProxyRMQ,
  ) {}

  async signIn({ email, password, keepConnected = false }: SignInDto) {
    const registered = await this.gcp.verifyValidUser({ email })
    if (!registered) throw new Error('Usuário não cadastrado')

    const response = await this.gcp.signIn({ email, password })

    const instance = this.clientProxy.getInstance('users')
    const user = await instance.send('user-show-email', email).toPromise()

    if (keepConnected) {
      return {
        user,
        access_token: response.idToken,
        refresh_token: response.refreshToken,
      }
    }

    return {
      user,
      access_token: response.idToken,
    }
  }
}
