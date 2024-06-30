import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../schedule.repository';
import { Schedule } from '../contracts';
import { InsertScheduleDto } from '../dtos';

@Injectable()
export class ScheduleInsertService {
  constructor(private readonly repository: ScheduleRepository) {}

  async run(input: InsertScheduleDto): Promise<Schedule> {
    return await this.repository.save(input);
  }
}
