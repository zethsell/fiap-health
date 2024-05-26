import { Module } from '@nestjs/common'
import { ProxyModule } from './proxy/proxy.module'
import { UserModule } from './user'

@Module({
  imports: [ProxyModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
