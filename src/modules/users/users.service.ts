import { Inject, Injectable } from '@nestjs/common';
import { UserType } from './entities/user.type';
import { USERS_REPOSITORY } from './users.repository';
import type { CreateUserParams, UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  findByEmail(email: string): Promise<UserType | undefined> {
    return this.usersRepository.findByEmail(email);
  }

  findById(id: string): Promise<UserType | undefined> {
    return this.usersRepository.findById(id);
  }

  create(params: CreateUserParams): Promise<UserType> {
    return this.usersRepository.create(params);
  }
  
}
