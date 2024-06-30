import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../schedule.repository';
import { DeleteScheduleDto } from '../dtos';

@Injectable()
export class ScheduleDeleteService {
  constructor(private readonly repository: ScheduleRepository) {}

  async run({ id }: DeleteScheduleDto) {
    await this.repository.delete({ id });
  }
}
