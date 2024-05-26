import { DataSource } from 'typeorm';
import { UserEntity } from '../entities';
import { RepositoryEnum } from '../../common/enums';

export const userProvider = [
  {
    provide: RepositoryEnum.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [RepositoryEnum.DATA_SOURCE],
  },
];
