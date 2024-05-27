import { Module } from '@nestjs/common'
import { ProxyModule } from './proxy/proxy.module'
import { UserModule } from './user'
import { ConsultModule } from './consult'

@Module({
  imports: [ProxyModule, UserModule, ConsultModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
