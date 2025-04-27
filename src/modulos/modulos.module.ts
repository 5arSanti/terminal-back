import { Module } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ModulosController],
  providers: [ModulosService],
})
export class ModulosModule {}
