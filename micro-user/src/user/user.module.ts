import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database'
import { UserRepository } from './user.repository'
import {
  UserDeleteService,
  UserInsertService,
  UserListService,
  UserShowService,
  UserUpdateService,
} from './services'
import {
  UserDeleteController,
  UserInsertController,
  UserListController,
  UserShowController,
  UserUpdateController,
} from './controllers'

@Module({
  imports: [DatabaseModule],
  controllers: [
    UserDeleteController,
    UserUpdateController,
    UserInsertController,
    UserShowController,
    UserListController,
  ],
  providers: [
    UserDeleteService,
    UserUpdateService,
    UserInsertService,
    UserShowService,
    UserListService,
    UserRepository,
  ],
  exports: [UserRepository],
})
export class UserModule {}
