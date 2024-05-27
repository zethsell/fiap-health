import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../contracts';
import { InsertUserDto } from '../dtos';

@Injectable()
export class UserInsertService {
  constructor(private readonly repository: UserRepository) {}

  async run(input: InsertUserDto): Promise<User> {
    const user = await this.repository.showByConditions({
      conditions: { email: input.email },
    });

    if (user) {
      throw new Error('User Already Exists');
    }

    return await this.repository.save(input);
  }
}
