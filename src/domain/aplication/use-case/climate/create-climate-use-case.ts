import { right, type Either } from '@/core/either';
import { WrongCredentialsError } from '@/core/errors/wrong-credentials-error';
import type { ClimateRepository } from '../../repository/climate-repository';
import { Climate } from '@/domain/enterprise/entities/climate';

interface CreateClimateRequest {
  timeStamp: Date;
  temperature: number;
  windSpeed: number;
  windDirection: string;
  weatherCode: string;
}

type CreateClimateResponse = Either<
  WrongCredentialsError,
  { climate: Climate }
>;

export class CreateClimateUseCase {
  constructor(private climateRepository: ClimateRepository) {}
  async execute({
    temperature,
    timeStamp,
    weatherCode,
    windDirection,
    windSpeed,
  }: CreateClimateRequest): Promise<CreateClimateResponse> {
    const climate = Climate.create({
      temperature,
      timeStamp,
      weatherCode,
      windDirection,
      windSpeed,
    });

    await this.climateRepository.create(climate);

    return right({ climate });
  }
}
