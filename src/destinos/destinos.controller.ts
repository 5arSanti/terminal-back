import { Controller, Get, Param } from '@nestjs/common';
import { DestinosService } from './destinos.service';

@Controller('destinos')
export class DestinosController {
  constructor(private readonly destinosService: DestinosService) {}

  @Get()
  getAll() {
    return this.destinosService.getDestinos();
  }

  @Get('routes')
  getDetalleDestinosRutas() {
    return this.destinosService.getDetalleDestinosRutas();
  }
}
