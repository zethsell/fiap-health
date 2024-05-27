import { Injectable } from '@nestjs/common'
import { ConsultRepository } from '../consult.repository'
import { DeleteConsultDto } from '../dtos'

@Injectable()
export class ConsultDeleteService {
  constructor(private readonly repository: ConsultRepository) {}

  async run({ id }: DeleteConsultDto) {
    await this.repository.delete({ id: Number.parseInt(id) })
  }
}
