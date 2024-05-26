import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../contracts';
import { InsertUserDto } from '../dtos';

@Injectable()
export class UserInsertService {
  constructor(private readonly repository: UserRepository) {}

  async run(input: InsertUserDto): Promise<User> {
    return await this.repository.save(input);
  }
}
