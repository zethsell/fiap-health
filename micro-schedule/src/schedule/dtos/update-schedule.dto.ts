import { IsNumber, IsObject, IsString } from 'class-validator';

export class UpdateScheduleDto {
  @IsNumber()
  id: string;

  @IsObject()
  content: any;

  @IsString()
  type: 'EXAM' | 'CONSULT';

  @IsString()
  date: string;

  @IsString()
  status: string;
}
