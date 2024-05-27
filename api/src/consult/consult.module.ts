import { Module } from '@nestjs/common'
import {
  ConsultDeleteController,
  ConsultInsertController,
  ConsultListController,
  ConsultShowController,
  ConsultUpdateController,
} from './controllers'
import { ProxyModule } from '../proxy/proxy.module'

@Module({
  controllers: [
    ConsultShowController,
    ConsultListController,
    ConsultDeleteController,
    ConsultInsertController,
    ConsultUpdateController,
  ],
  imports: [ProxyModule],
})
export class ConsultModule {}
