import { left, right, type Either } from '@/core/either';
import { WrongCredentialsError } from '@/core/errors/wrong-credentials-error';
import { User } from '../../../enterprise/entities/user';

import type { UserRepository } from '../../repository/user-repository';
import type { HashComparer } from '../../cryptography/hash-comparer';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { Encrypter } from '../../cryptography/encrypter';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

type AuthenticateUserResponse = Either<
  ResourceNotFoundError,
  { access_token: string }
>;

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}
  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const emailExist = await this.userRepository.findByEmail(email);

    if (!emailExist) {
      return left(new ResourceNotFoundError());
    }

    const isPasswordValid = this.hashComparer.compare(
      password,
      emailExist.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const access_token = await this.encrypter.encrypt({
      sub: emailExist.id.toString(),
    });

    return right({ access_token });
  }
}
