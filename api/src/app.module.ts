import { Module } from '@nestjs/common'
import { ProxyModule } from './proxy/proxy.module'
import { UserModule } from './user'
import { ConsultModule } from './consult'
import { ExamModule } from './exam'

@Module({
  imports: [ProxyModule, UserModule, ConsultModule, ExamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
