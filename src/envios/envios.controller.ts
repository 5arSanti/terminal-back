import { Body, Controller, Get, Post } from '@nestjs/common';
import { EnviosService } from './envios.service';
import { CreateEnvioCheckoutDto } from './dto/envios.dto';

@Controller('envios')
export class EnviosController {
  constructor(private readonly enviosService: EnviosService) { }

  @Get()
  getAllWithDetalle() {
    return this.enviosService.obtenerEnviosConDetalle();
  }
  
  @Post()
  createWithCheckout(@Body() dto: CreateEnvioCheckoutDto) {
    return this.enviosService.crearEnvioConCheckout(dto);
  }
}
