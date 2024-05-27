import { IsString } from 'class-validator'

export class UpdateExamDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  date: string

  @IsString()
  status: string
}
