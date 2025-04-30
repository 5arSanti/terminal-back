import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ViajesService } from './viajes.service';
import { ViajesController } from './viajes.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ViajesController],
  providers: [ViajesService],
})
export class ViajesModule {}
