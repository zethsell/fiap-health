import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../contracts';

@Injectable()
export class UserListService {
  constructor(private readonly repository: UserRepository) {}

  async run(): Promise<Array<User>> {
    return await this.repository.get();
  }
}
