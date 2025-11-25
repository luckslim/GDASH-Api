import { ClimateExport } from '@/domain/aplication/export/climate-export';
import { Climate } from '@/domain/enterprise/entities/climate';

export class FakeExport implements ClimateExport {
  csvExport(climate: Climate[]): string {
    return JSON.stringify(climate);
  }
}
