import { DataSource } from 'typeorm';
import { UserAuthEntity } from '../entities';
import { RepositoryEnum } from '../../common/enums';

export const userAuthProvider = [
  {
    provide: RepositoryEnum.USER_AUTH_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserAuthEntity),
    inject: [RepositoryEnum.DATA_SOURCE],
  },
];
