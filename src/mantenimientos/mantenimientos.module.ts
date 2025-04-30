import { Module } from '@nestjs/common';
import { MantenimientosService } from './mantenimientos.service';
import { MantenimientosController } from './mantenimientos.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MantenimientosController],
  providers: [MantenimientosService],
})
export class MantenimientosModule {}
