import { IsObject, IsString } from 'class-validator';

export class InsertScheduleDto {
  @IsObject()
  content: any;

  @IsString()
  type: 'EXAM' | 'CONSULT';

  @IsString()
  date: string;

  @IsString()
  status: string;
}
