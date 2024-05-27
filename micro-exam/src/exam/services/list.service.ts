import { Injectable } from '@nestjs/common'
import { ExamRepository } from '../exam.repository'
import { Exam } from '../contracts'

@Injectable()
export class ExamListService {
  constructor(private readonly repository: ExamRepository) {}

  async run(): Promise<Array<Exam>> {
    return await this.repository.get()
  }
}
