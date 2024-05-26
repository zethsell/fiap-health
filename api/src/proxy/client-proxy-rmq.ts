import 'dotenv/config'
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ClientProxyRMQ {
  constructor(private readonly configService: ConfigService) {}

  getInstance(queue = 'default'): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`${this.configService.get<string>('RABBITMQ_URL')}`],
        queue,
      },
    })
  }
}
