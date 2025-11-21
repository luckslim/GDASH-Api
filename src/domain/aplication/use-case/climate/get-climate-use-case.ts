import { left, right, type Either } from '@/core/either';
import { WrongCredentialsError } from '@/core/errors/wrong-credentials-error';
import type { ClimateRepository } from '../../repository/climate-repository';
import { Climate } from '@/domain/enterprise/entities/climate';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { UserRepository } from '../../repository/user-repository';
import { loadEnvFile } from 'process';
import { NotAllowedError } from '@/core/errors/not-allowed-error';

interface GetClimateRequest {
  id: string; //id from user
  page: number;
}

type GetClimateResponse = Either<ResourceNotFoundError, { climate: Climate[] }>;

export class GetClimateUseCase {
  constructor(
    private userRepository: UserRepository,
    private climateRepository: ClimateRepository,
  ) {}
  async execute({ id, page }: GetClimateRequest): Promise<GetClimateResponse> {
    const user = this.userRepository.findById(id);

    if (!user) {
      return left(new NotAllowedError());
    }
    const climate = await this.climateRepository.findManyRecent(page);

    if (climate.length === 0) {
      return left(new ResourceNotFoundError());
    }

    return right({ climate });
  }
}
