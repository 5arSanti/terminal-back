import { Controller, Get, Param, Query } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { BoletoDto } from './dto/boleto.dto';

@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  // Obtener todos los boletos
  @Get()
  async getBoletos(): Promise<BoletoDto[]> {
    const boletos = await this.boletosService.getBoletos();
    return boletos.map(boleto => new BoletoDto(boleto));  // Mapea los boletos a la estructura de BoletoDto
  }

  // Obtener boleto por su ID
  @Get(':id_boleto')
  async getBoletoPorId(@Param('id_boleto') id_boleto: number): Promise<BoletoDto> {
    const boleto = await this.boletosService.getBoletoPorId(id_boleto);
    return new BoletoDto(boleto);  // Retorna el boleto con la estructura de BoletoDto
  }

  // Obtener boletos por viaje (bus y ruta)
  @Get('viaje')
  async getBoletosPorViaje(
    @Query('id_bus') id_bus: number,
    @Query('id_ruta') id_ruta: number,
  ): Promise<BoletoDto[]> {
    const boletos = await this.boletosService.getBoletosPorViaje(id_bus, id_ruta);
    return boletos.map(boleto => new BoletoDto(boleto));  // Mapea los boletos a la estructura de BoletoDto
  }
}
