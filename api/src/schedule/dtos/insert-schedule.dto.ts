import { IsObject, IsString } from 'class-validator'
import { Exam } from '../../exam/contracts'
import { Consult } from '../../consult/contracts'
import { ApiProperty } from '@nestjs/swagger'

export class InsertScheduleDto {
  @ApiProperty()
  @IsObject()
  content: Exam | Consult

  @ApiProperty()
  @IsString()
  type: string

  @ApiProperty()
  @IsString()
  date: string

  @ApiProperty()
  @IsString()
  status: string
}
