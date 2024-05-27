import { Module } from '@nestjs/common'
import { ExamModule } from './exam'

@Module({
  imports: [ExamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
