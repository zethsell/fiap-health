import {
  DeleteSchedule,
  ListSchedules,
  SaveSchedule,
  ScheduleModel,
  ShowSchedule,
} from './contracts';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class ScheduleRepository
  implements ListSchedules, ShowSchedule, SaveSchedule, DeleteSchedule
{
  constructor(
    @InjectModel('Schedule') private readonly model: Model<ScheduleModel>,
  ) {}

  async get(): Promise<ListSchedules.Output> {
    return await this.model.find().exec();
  }

  async show({ id }: ShowSchedule.Input): Promise<ShowSchedule.Output> {
    return await this.model.findOne({ _id: id }).exec();
  }

  async save(input: SaveSchedule.Input): Promise<SaveSchedule.Output> {
    console.log(input);

    if (input.id) {
      return await this.model
        .findOneAndUpdate({ _id: input.id }, { $set: input })
        .exec();
    }

    const schedule = new this.model(input);
    return await schedule.save();
  }

  async delete({ id }: DeleteSchedule.Input): Promise<void> {
    await this.model.deleteOne({ _id: id }).exec();
  }
}
