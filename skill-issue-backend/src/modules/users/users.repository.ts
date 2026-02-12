import { UserType } from './entities/user.type';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export type CreateUserParams = {
  id: string;
  email: string;
  username: string;
  passwordHash?: string;
};

export interface UsersRepository {
  findByEmail(email: string): Promise<UserType | undefined>;
  findById(id: string): Promise<UserType | undefined>;
  create(params: CreateUserParams): Promise<UserType>;
}
