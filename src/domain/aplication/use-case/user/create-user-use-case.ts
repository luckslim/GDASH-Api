import { left, right, type Either } from '@/core/either';
import { WrongCredentialsError } from '@/core/errors/wrong-credentials-error';
import { User } from '../../../enterprise/entities/user';

import { CredentialAlreadyExistError } from '@/core/errors/credential-already-exist-error';
import type { UserRepository } from '../../repository/user-repository';
import type { HashGenerator } from '../../cryptography/hash-generator';

interface CreateUserRequest {
  name: string;
  userName: string;
  email: string;
  password: string;
}

type CreateUserResponse = Either<WrongCredentialsError, { user: User }>;

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}
  async execute({
    name,
    userName,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const emailAlreadyExist = await this.userRepository.findByEmail(email);

    if (emailAlreadyExist) {
      return left(new CredentialAlreadyExistError(email));
    }

    const userNameAlreadyExist =
      await this.userRepository.findByUserName(userName);

    if (userNameAlreadyExist) {
      return left(new CredentialAlreadyExistError(userName));
    }
    const passwordHashed = await this.hashGenerator.hash(password);
    const user = User.create({
      name,
      userName,
      email,
      password: passwordHashed,
    });

    await this.userRepository.create(user);

    return right({ user });
  }
}
