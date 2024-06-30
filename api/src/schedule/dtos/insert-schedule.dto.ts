import { IsObject, IsString } from 'class-validator'
import { Exam } from '../../exam/contracts'
import { Consult } from '../../consult/contracts'

export class InsertScheduleDto {
  @IsObject()
  content: Exam | Consult

  @IsString()
  type: string

  @IsString()
  date: string

  @IsString()
  status: string
}
