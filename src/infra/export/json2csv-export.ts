import { ClimateExport } from '@/domain/aplication/export/climate-export';
import { Climate } from '@/domain/enterprise/entities/climate';
import { Injectable } from '@nestjs/common';
import { json2csv } from 'json-2-csv';

@Injectable()
export class Json2CsvExport implements ClimateExport {
  csvExport(climate: Climate[]): string {
    const parser = json2csv(climate);
    return parser;
  }
}
