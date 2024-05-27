import { Injectable } from '@nestjs/common'
import { ExamRepository } from '../exam.repository'
import { Exam } from '../contracts'
import { UpdateExamDto } from '../dtos'

@Injectable()
export class ExamUpdateService {
  constructor(private readonly repository: ExamRepository) {}

  async run(input: UpdateExamDto): Promise<Exam> {
    return await this.repository.save(input)
  }
}
