import { left, right, type Either } from '@/core/either';
import { WrongCredentialsError } from '@/core/errors/wrong-credentials-error';
import type { ClimateRepository } from '../../repository/climate-repository';
import { Climate } from '@/domain/enterprise/entities/climate';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface DeleteClimateRequest {
  id: string;
}

type DeleteClimateResponse = Either<
  WrongCredentialsError,
  { climate: Climate }
>;

export class DeleteClimateUseCase {
  constructor(private climateRepository: ClimateRepository) {}
  async execute({ id }: DeleteClimateRequest): Promise<DeleteClimateResponse> {
    const climate = await this.climateRepository.findById(id);

    if (!climate) {
      return left(new ResourceNotFoundError());
    }

    await this.climateRepository.delete(id);

    return right({ climate });
  }
}
