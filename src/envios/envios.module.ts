import { Module } from '@nestjs/common';
import { EnviosService } from './envios.service';
import { EnviosController } from './envios.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EnviosController],
  providers: [EnviosService],
})
export class EnviosModule { }
