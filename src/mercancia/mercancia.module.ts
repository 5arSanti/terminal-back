import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module'; // Asegúrate de importar tu módulo de base de datos
import { MercanciaService } from './mercancia.service';
import { MercanciaController } from './mercancia.controller';

@Module({
  imports: [DatabaseModule], // Importa el módulo de la base de datos
  controllers: [MercanciaController], // Agrega el controlador de mercancía
  providers: [MercanciaService], // Agrega el servicio de mercancía
})
export class MercanciaModule {}



