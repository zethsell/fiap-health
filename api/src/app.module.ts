import { Module } from '@nestjs/common'
import { ProxyModule } from './proxy'
import { UserModule } from './user'
import { ConsultModule } from './consult'
import { ExamModule } from './exam'
import { ScheduleModule } from './schedule'
import { AuthGuard, AuthModule } from './auth'
import { APP_GUARD } from '@nestjs/core'
import { AxiosHttpClient, GoogleAuthApi } from './gateways'

@Module({
  imports: [
    ProxyModule,
    UserModule,
    ConsultModule,
    ExamModule,
    ScheduleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    GoogleAuthApi,
    AxiosHttpClient,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
