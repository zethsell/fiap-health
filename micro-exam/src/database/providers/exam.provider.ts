import { DataSource } from 'typeorm'
import { ExamEntity } from '../entities'
import { RepositoryEnum } from '../../common/enums'

export const examProvider = [
  {
    provide: RepositoryEnum.EXAM_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExamEntity),
    inject: [RepositoryEnum.DATA_SOURCE],
  },
]
