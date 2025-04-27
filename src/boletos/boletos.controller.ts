import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { PurchaseBoletoDto } from './dto/boletos.dto';

@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) { }

  @Get()
  getBoletos() {
    return this.boletosService.getBoletos();
  }

  @Post('purchase')
  purchaseBoleto(@Body() purchaseBoletoDto: PurchaseBoletoDto) {
    return this.boletosService.purchaseBoleto(purchaseBoletoDto);
  }
}
