import { Injectable } from '@nestjs/common'
import { ExamRepository } from '../exam.repository'
import { Exam } from '../contracts'
import { InsertExamDto } from '../dtos'

@Injectable()
export class ExamInsertService {
  constructor(private readonly repository: ExamRepository) {}

  async run(input: InsertExamDto): Promise<Exam> {
    return await this.repository.save(input)
  }
}
