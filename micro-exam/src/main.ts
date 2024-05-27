import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const configService = new ConfigService()

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.get<string>('RABBITMQ_URL')}`],
      noAck: false,
      queue: 'exams',
    },
  })
  await app.listen()
}

bootstrap().then(() => console.log('Exam microservice is listening'))
