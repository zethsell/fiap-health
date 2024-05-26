import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../contracts';
import { UpdateUserDto } from '../dtos';

@Injectable()
export class UserUpdateService {
  constructor(private readonly repository: UserRepository) {}

  async run(input: UpdateUserDto): Promise<User> {
    return await this.repository.save(input);
  }
}
