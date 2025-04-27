import { Controller, UseGuards } from '@nestjs/common';
import { EnviosService } from './envios.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('envios')
export class EnviosController {
  constructor(private readonly enviosService: EnviosService) {}


}
