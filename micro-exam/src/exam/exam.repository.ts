import {
  DeleteExam,
  ListExams,
  SaveExam,
  ShowExam,
  ShowExamByConditions,
} from './contracts'
import { ExamEntity } from '../database/entities'
import { Repository } from 'typeorm'
import { RepositoryEnum } from '../common/enums'
import { Inject } from '@nestjs/common'

export class ExamRepository
  implements ListExams, ShowExam, SaveExam, DeleteExam, ShowExamByConditions
{
  constructor(
    @Inject(RepositoryEnum.EXAM_REPOSITORY)
    private repository: Repository<ExamEntity>,
  ) {}

  async get(): Promise<ListExams.Output> {
    return await this.repository.find()
  }

  async show({ id }: ShowExam.Input): Promise<ShowExam.Output> {
    return await this.repository.findOne({ where: { id } })
  }

  async showByConditions({
    conditions,
  }: ShowExamByConditions.Input): Promise<ShowExamByConditions.Output> {
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

  async save(input: SaveExam.Input): Promise<SaveExam.Output> {
    await this.repository.save(input)
    return this.show({ id: input.id })
  }

  async delete({ id }: DeleteExam.Input): Promise<void> {
    await this.repository.softDelete(id)
  }
}
