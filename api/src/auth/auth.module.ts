import { Module } from '@nestjs/common'
import { SignInController, SignUpController } from './controllers'
import { SignInService, SignUpService } from './services'
import { ProxyModule } from '../proxy'
import { AxiosHttpClient, GoogleAuthApi } from '../gateways'

@Module({
  controllers: [SignUpController, SignInController],
  providers: [SignUpService, SignInService, GoogleAuthApi, AxiosHttpClient],
  imports: [ProxyModule],
})
export class AuthModule {}
