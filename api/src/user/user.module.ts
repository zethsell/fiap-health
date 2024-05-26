import { Module } from '@nestjs/common'
import {
  UserDeleteController,
  UserInsertController,
  UserListController,
  UserShowController,
  UserUpdateController,
} from './controllers'
import { ProxyModule } from '../proxy/proxy.module'

@Module({
  controllers: [
    UserShowController,
    UserListController,
    UserDeleteController,
    UserInsertController,
    UserUpdateController,
  ],
  imports: [ProxyModule],
})
export class UserModule {}
