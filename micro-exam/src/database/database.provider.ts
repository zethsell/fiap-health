import databaseSource from './database.source'
import { RepositoryEnum } from '../common/enums'

export const databaseProviders = [
  {
    provide: RepositoryEnum.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = databaseSource
      return dataSource.initialize()
    },
  },
]
