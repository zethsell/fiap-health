import { Document } from 'mongoose';
import { Consult, Exam } from '.';

export interface ScheduleModel extends Schedule, Document {}

export interface Schedule {
  date?: Date | string;
  status?: string;
  type: 'EXAM' | 'CONSULT';
  content: Consult | Exam;
}

export interface ListSchedules {
  get: () => Promise<ListSchedules.Output>;
}

export namespace ListSchedules {
  export type Output = Schedule[];
}

export interface SaveSchedule {
  save: (input: SaveSchedule.Input) => Promise<SaveSchedule.Output>;
}

export namespace SaveSchedule {
  export type Input = Omit<
    Schedule,
    'createdAt' | 'updatedAt' | 'deletedAt' | 'id'
  > & { id?: string };
  export type Output = Schedule;
}

export interface ShowSchedule {
  show: (input: ShowSchedule.Input) => Promise<ShowSchedule.Output>;
}

export namespace ShowSchedule {
  export type Input = { id: string };
  export type Output = Schedule;
}

export interface ShowScheduleByConditions {
  showByConditions: (
    input: ShowScheduleByConditions.Input,
  ) => Promise<ShowScheduleByConditions.Output>;
}

export namespace ShowScheduleByConditions {
  export type Input = { conditions: Partial<Schedule> };
  export type Output = Schedule;
}

export interface DeleteSchedule {
  delete: (input: DeleteSchedule.Input) => Promise<void>;
}

export namespace DeleteSchedule {
  export type Input = { id: string };
}
