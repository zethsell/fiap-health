import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../schedule.repository';
import { Schedule } from '../contracts';
import { UpdateScheduleDto } from '../dtos';

@Injectable()
export class ScheduleUpdateService {
  constructor(private readonly repository: ScheduleRepository) {}

  async run(input: UpdateScheduleDto): Promise<Schedule> {
    return await this.repository.save(input);
  }
}
