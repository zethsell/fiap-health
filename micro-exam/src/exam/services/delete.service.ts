import { Injectable } from '@nestjs/common'
import { ExamRepository } from '../exam.repository'
import { DeleteExamDto } from '../dtos'

@Injectable()
export class ExamDeleteService {
  constructor(private readonly repository: ExamRepository) {}

  async run({ id }: DeleteExamDto) {
    await this.repository.delete({ id: Number.parseInt(id) })
  }
}
