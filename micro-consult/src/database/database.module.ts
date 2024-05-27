import { Module } from '@nestjs/common'
import { databaseProviders } from './database.provider'
import { consultProvider } from './providers'

@Module({
  providers: [...databaseProviders, ...consultProvider],
  exports: [...databaseProviders, ...consultProvider],
})
export class DatabaseModule {}
