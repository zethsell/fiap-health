import { IsObject, IsString } from 'class-validator'
import { Exam } from '../../exam/contracts'
import { Consult } from '../../consult/contracts'

export class UpdateScheduleDto {
  @IsObject()
  content: Exam | Consult

  @IsString()
  type: 'EXAM' | 'CONSULT'

  @IsString()
  date: string

  @IsString()
  status: string
}
