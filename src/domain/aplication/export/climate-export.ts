import { Climate } from '@/domain/enterprise/entities/climate';

export abstract class ClimateExport {
  abstract csvExport(climate: Climate[]): string;
}
