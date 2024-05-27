import { DataSource } from 'typeorm'
import { ConsultEntity } from '../entities'
import { RepositoryEnum } from '../../common/enums'

export const consultProvider = [
  {
    provide: RepositoryEnum.CONSULT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ConsultEntity),
    inject: [RepositoryEnum.DATA_SOURCE],
  },
]
