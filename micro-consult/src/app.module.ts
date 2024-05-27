import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConsultModule } from './consult/consult.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ConsultModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
