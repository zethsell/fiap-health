import { IsNumber, IsString } from 'class-validator'

export class UpdateExamDto {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  date: string

  @IsString()
  status: string
}
