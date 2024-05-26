import { Injectable } from '@nestjs/common'
import { SignUpDto } from '../dtos'
import { GoogleAuthApi } from '../../gateways'
import { RegistrationFailError } from '../../common/errors'
import { ClientProxyRMQ } from '../../proxy'
import { catchError, shareReplay } from 'rxjs'

@Injectable()
export class SignUpService {
  constructor(
    private readonly gcp: GoogleAuthApi,
    private readonly clientProxy: ClientProxyRMQ,
  ) {}

  async signUp(userDTO: SignUpDto) {
    this.saveUserDB(userDTO).subscribe(async () => {
      await this.saveUserGCP(userDTO)
    })
  }

  private saveUserDB(userDTO: SignUpDto) {
    const user = userDTO
    delete user.password
    const client = this.clientProxy.getInstance('auth')
    const savedUser = client.send<typeof user>('signup', user)
    return savedUser.pipe(
      shareReplay(),
      catchError((err) => {
        throw new Error(err.getMessage())
      }),
    )
  }

  private async saveUserGCP(userDTO: SignUpDto) {
    const result = await this.gcp.signUp({
      email: userDTO.email,
      password: userDTO.password,
    })
    if (result === undefined) throw new RegistrationFailError()
  }
}
