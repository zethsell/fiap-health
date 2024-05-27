import { Injectable, NotFoundException } from '@nestjs/common'
import { ConsultRepository } from '../consult.repository'
import { ShowConsultDto } from '../dtos'
import { Consult } from '../contracts'

@Injectable()
export class ConsultShowService {
  constructor(private readonly repository: ConsultRepository) {}

  async run({ id }: ShowConsultDto): Promise<Consult> {
    const user = await this.repository.show({ id: Number.parseInt(id) })
    if (!user) throw new NotFoundException('Consult not found')
    return user
  }
}
