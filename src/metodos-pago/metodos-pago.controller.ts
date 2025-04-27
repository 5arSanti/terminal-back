import { Controller, Get } from '@nestjs/common';
import { MetodosPagoService } from './metodos-pago.service';

@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) { }

  @Get()
  getAll() {
    return this.metodosPagoService.getMetodosPago();
  }
}
