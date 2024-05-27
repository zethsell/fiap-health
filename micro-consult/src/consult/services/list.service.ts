import { Injectable } from '@nestjs/common'
import { ConsultRepository } from '../consult.repository'
import { Consult } from '../contracts'

@Injectable()
export class ConsultListService {
  constructor(private readonly repository: ConsultRepository) {}

  async run(): Promise<Array<Consult>> {
    return await this.repository.get()
  }
}
