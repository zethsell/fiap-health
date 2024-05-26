import { Module } from '@nestjs/common'
import { SignUpController } from './controllers'
import { SignUpService } from './services'

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
  imports: [],
})
export class AuthModule {}
