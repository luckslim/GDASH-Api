import type { Climate } from '@/domain/enterprise/entities/climate';

export interface ClimateRepository {
  create(climate: Climate): Promise<void>;
  findById(id: string): Promise<Climate | null>;
  findManyRecent(page: number): Promise<Climate[]>;
  delete(id: string): Promise<null>;
}
