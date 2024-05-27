import { Module } from '@nestjs/common'
import { databaseProviders } from './database.provider'
import { examProvider } from './providers'

@Module({
  providers: [...databaseProviders, ...examProvider],
  exports: [...databaseProviders, ...examProvider],
})
export class DatabaseModule {}
