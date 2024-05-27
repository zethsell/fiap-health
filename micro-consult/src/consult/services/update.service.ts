import { Injectable } from '@nestjs/common'
import { ConsultRepository } from '../consult.repository'
import { Consult } from '../contracts'
import { UpdateConsultDto } from '../dtos'

@Injectable()
export class ConsultUpdateService {
  constructor(private readonly repository: ConsultRepository) {}

  async run(input: UpdateConsultDto): Promise<Consult> {
    return await this.repository.save(input)
  }
}
