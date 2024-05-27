import {
  DeleteConsult,
  ListConsults,
  SaveConsult,
  ShowConsult,
  ShowConsultByConditions,
} from './contracts'
import { ConsultEntity } from '../database/entities'
import { Repository } from 'typeorm'
import { Inject } from '@nestjs/common'
import { RepositoryEnum } from '../common/enums'

export class ConsultRepository
  implements
    ListConsults,
    ShowConsult,
    SaveConsult,
    DeleteConsult,
    ShowConsultByConditions
{
  constructor(
    @Inject(RepositoryEnum.CONSULT_REPOSITORY)
    private repository: Repository<ConsultEntity>,
  ) {}

  async get(): Promise<ListConsults.Output> {
    return await this.repository.find()
  }

  async show({ id }: ShowConsult.Input): Promise<ShowConsult.Output> {
    return await this.repository.findOne({ where: { id } })
  }

  async showByConditions({
    conditions,
  }: ShowConsultByConditions.Input): Promise<ShowConsultByConditions.Output> {
    return await this.repository
      .createQueryBuilder('consult')
      .where((qb) => {
        if (conditions) {
          qb.where('1 = 1')
          Object.entries(conditions).forEach(([key, value]) => {
            qb.andWhere({ [key]: value })
          })
        }
      })
      .getOne()
  }

  async save(input: SaveConsult.Input): Promise<SaveConsult.Output> {
    await this.repository.save(input)
    return this.show({ id: input.id })
  }

  async delete({ id }: DeleteConsult.Input): Promise<void> {
    await this.repository.softDelete(id)
  }
}
