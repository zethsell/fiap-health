import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { userAuthProvider, userProvider } from './providers';

@Module({
  providers: [...databaseProviders, ...userProvider, ...userAuthProvider],
  exports: [...databaseProviders, ...userProvider, ...userAuthProvider],
})
export class DatabaseModule {}
