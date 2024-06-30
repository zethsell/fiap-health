import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleRepository } from '../schedule.repository';
import { ShowScheduleDto } from '../dtos';
import { Schedule } from '../contracts';

@Injectable()
export class ScheduleShowService {
  constructor(private readonly repository: ScheduleRepository) {}

  async run({ id }: ShowScheduleDto): Promise<Schedule> {
    const schedule = await this.repository.show({ id });
    if (!schedule) throw new NotFoundException('Schedule not found');
    return schedule;
  }
}
