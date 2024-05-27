import { Controller } from '@nestjs/common';
import { RmqChannel } from '../contracts';

@Controller()
export class BaseController {
  protected ackErrors: string[] = ['E11000'];

  protected async parseError(
    error: any,
    channel: RmqChannel,
    originalMsg: Record<string, any>,
  ) {
    const filterAckError = this.ackErrors.filter((ackError) =>
      error.message.includes(ackError),
    );

    if (filterAckError.length > 0) {
      await channel.ack(originalMsg);
    }
  }
}
