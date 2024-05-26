import {
  DeleteUser,
  ListUsers,
  SaveUser,
  ShowUser,
  ShowUserByConditions,
} from './contracts';
import { UserEntity } from '../database/entities';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { RepositoryEnum } from '../common/enums';

export class UserRepository
  implements ListUsers, ShowUser, SaveUser, DeleteUser, ShowUserByConditions
{
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
  ) {}

  async get(): Promise<ListUsers.Output> {
    return await this.repository.find();
  }

  async show({ id }: ShowUser.Input): Promise<ShowUser.Output> {
    return await this.repository.findOne({ where: { id } });
  }

  async showByConditions({
    conditions,
  }: ShowUserByConditions.Input): Promise<ShowUserByConditions.Output> {
    return await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.auth', 'auth')
      .where((qb) => {
        if (conditions) {
          qb.where('1 = 1');
          Object.entries(conditions).forEach(([key, value]) => {
            qb.andWhere({ [key]: value });
          });
        }
      })
      .getOne();
  }

  async save(input: SaveUser.Input): Promise<SaveUser.Output> {
    await this.repository.save(input);
    return this.show({ id: input.id });
  }

  async delete({ id }: DeleteUser.Input): Promise<void> {
    await this.repository.softDelete(id);
  }
}
