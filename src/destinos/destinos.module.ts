import { Module } from '@nestjs/common';
import { DestinosService } from './destinos.service';
import { DestinosController } from './destinos.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DestinosController],
  providers: [DestinosService],
})
export class DestinosModule {}
