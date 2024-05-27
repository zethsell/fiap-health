import { Injectable, NotFoundException } from '@nestjs/common'
import { ExamRepository } from '../exam.repository'
import { ShowExamDto } from '../dtos'
import { Exam } from '../contracts'

@Injectable()
export class ExamShowService {
  constructor(private readonly repository: ExamRepository) {}

  async run({ id }: ShowExamDto): Promise<Exam> {
    const user = await this.repository.show({ id: Number.parseInt(id) })
    if (!user) throw new NotFoundException('Exam not found')
    return user
  }
}
