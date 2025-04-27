import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MercanciaService } from './mercancia.service';
import { MercanciaController } from './mercancia.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MercanciaController], 
  providers: [MercanciaService],
})
export class MercanciaModule {}
