import { Controller, Get } from '@nestjs/common';
import { MercanciaService } from './mercancia.service';

@Controller('mercancia')
export class MercanciaController {
  constructor(private readonly mercanciaService: MercanciaService) {}

  @Get()
  getMercancia() {
    return this.mercanciaService.getMercancia();
  }
}
