import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { ShowUserDto } from '../dtos';
import { User } from '../contracts';

@Injectable()
export class UserShowService {
  constructor(private readonly repository: UserRepository) {}

  async run({ id }: ShowUserDto): Promise<User> {
    const user = await this.repository.show({ id: Number.parseInt(id) });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
