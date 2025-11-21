import { left, right, type Either } from '@/core/either';
import { WrongCredentialsError } from '@/core/errors/wrong-credentials-error';

import type { UserRepository } from '../../repository/user-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface DeleteUserRequest {
  id: string; //id from jwt
  email: string;
}

type DeleteUserResponse = Either<WrongCredentialsError, { message: string }>;

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, email }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const admin = await this.userRepository.findById(id);

    if (!admin) {
      return left(new ResourceNotFoundError());
    }

    if (admin.email !== email) {
      return left(new WrongCredentialsError());
    }

    await this.userRepository.delete(id);

    return right({ message: 'User Deleted' });
  }
}
