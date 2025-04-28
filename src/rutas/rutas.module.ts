import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [RutasController],
  providers: [RutasService],
})
export class RutasModule {}
