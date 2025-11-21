import { left, right, type Either } from '@/core/either';
import { User } from '../../../enterprise/entities/user';

import type { UserRepository } from '../../repository/user-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import type { HashGenerator } from '../../cryptography/hash-generator';

interface EditUserRequest {
  id: string;
  name: string;
  userName: string;
  email: string;
  password: string;
}

type EditUserResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { user: User }
>;

export class EditUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}
  async execute({
    id,
    name,
    userName,
    email,
    password,
  }: EditUserRequest): Promise<EditUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    if (user.id.toString() !== id) {
      return left(new NotAllowedError());
    }

    const passwordHashed = await this.hashGenerator.hash(password);

    user.name = name;
    user.userName = userName;
    user.email = email;
    user.password = passwordHashed;

    await this.userRepository.save(user);

    return right({ user });
  }
}
