import { IsString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateConsultDto {
  @ApiPropertyOptional()
  @IsString()
  title: string

  @ApiPropertyOptional()
  @IsString()
  description: string

  @ApiPropertyOptional()
  @IsString()
  date: string

  @ApiPropertyOptional()
  @IsString()
  status: string
}
