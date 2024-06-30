import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateExamDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsString()
  date: string

  @ApiProperty()
  @IsString()
  status: string
}
