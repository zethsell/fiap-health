import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database'
import { ConsultRepository } from './consult.repository'
import {
  ConsultDeleteService,
  ConsultInsertService,
  ConsultListService,
  ConsultShowService,
  ConsultUpdateService,
} from './services'
import {
  ConsultDeleteController,
  ConsultInsertController,
  ConsultListController,
  ConsultShowController,
  ConsultUpdateController,
} from './controllers'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ConsultDeleteController,
    ConsultUpdateController,
    ConsultInsertController,
    ConsultShowController,
    ConsultListController,
  ],
  providers: [
    ConsultDeleteService,
    ConsultUpdateService,
    ConsultInsertService,
    ConsultShowService,
    ConsultListService,
    ConsultRepository,
  ],
  exports: [ConsultRepository],
})
export class ConsultModule {}
