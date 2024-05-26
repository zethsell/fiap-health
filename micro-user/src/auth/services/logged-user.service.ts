import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { User } from '../../user/contracts';
import { LoggedUserDto } from '../dtos/logged-user.dto';

@Injectable()
export class LoggedUserService {
  constructor(private readonly repository: UserRepository) {}

  async run({ email }: LoggedUserDto): Promise<User> {
    const user = await this.repository.showByConditions({
      conditions: { email },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
