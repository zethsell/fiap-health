import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../schedule.repository';
import { Schedule } from '../contracts';

@Injectable()
export class ScheduleListService {
  constructor(private readonly repository: ScheduleRepository) {}

  async run(): Promise<Array<Schedule>> {
    return await this.repository.get();
  }
}
