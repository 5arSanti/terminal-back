import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BusesController],
  providers: [BusesService],
})
export class BusesModule {}
