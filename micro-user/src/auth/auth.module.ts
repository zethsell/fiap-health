import { Module } from '@nestjs/common';
import { SignUpController } from './controllers/sign-up.controller';
import { SignUpService } from './services/sign-up.service';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
})
export class AuthModule {}
