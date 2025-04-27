import { Controller, Get, Post, Body } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CreateCiudadDto } from './dto/ciudades.dto';

@Controller('ciudades')
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) { }

  @Get()
  getCiudades() {
    return this.ciudadesService.getCiudades();
  }

  @Post()
  createCiudad(@Body() { nombre }: CreateCiudadDto) {
    return this.ciudadesService.createCiudad(nombre);
  }
}
