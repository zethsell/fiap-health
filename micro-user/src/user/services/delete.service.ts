import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { DeleteUserDto } from '../dtos';

@Injectable()
export class UserDeleteService {
  constructor(private readonly repository: UserRepository) {}

  async run({ id }: DeleteUserDto) {
    await this.repository.delete({ id: Number.parseInt(id) });
  }
}
