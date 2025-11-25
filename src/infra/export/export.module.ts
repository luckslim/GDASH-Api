import { ClimateExport } from '@/domain/aplication/export/climate-export';
import { Module } from '@nestjs/common';
import { Json2CsvExport } from './json2csv-export';

@Module({
  providers: [{ provide: ClimateExport, useClass: Json2CsvExport }],
  exports: [ClimateExport],
})
export class ExportModule {}
