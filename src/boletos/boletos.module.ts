import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BoletosService } from './boletos.service';
import { BoletosController } from './boletos.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class BoletosModule {}
