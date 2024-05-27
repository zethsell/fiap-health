import { Injectable } from '@nestjs/common'
import { ConsultRepository } from '../consult.repository'
import { Consult } from '../contracts'
import { InsertConsultDto } from '../dtos'

@Injectable()
export class ConsultInsertService {
  constructor(private readonly repository: ConsultRepository) {}

  async run(input: InsertConsultDto): Promise<Consult> {
    return await this.repository.save(input)
  }
}
