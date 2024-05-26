import { Module } from '@nestjs/common'
import { ClientProxyRMQ } from '.'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  providers: [ClientProxyRMQ],
  exports: [ClientProxyRMQ],
})
export class ProxyModule {}
