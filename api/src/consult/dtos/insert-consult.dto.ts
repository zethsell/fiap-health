import { IsString } from 'class-validator'

export class InsertConsultDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  date: string

  @IsString()
  status: string
}
