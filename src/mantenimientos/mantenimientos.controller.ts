import { Body, Controller, Get, Post } from '@nestjs/common';
import { MantenimientosService } from './mantenimientos.service';
import { CreateMantenimientoDto } from './dto/mantenimientos.dto';

@Controller('mantenimientos')
export class MantenimientosController {
  constructor(private readonly mantenimientosService: MantenimientosService) { }

  @Get()
  getAll() {
    return this.mantenimientosService.obtenerMantenimientos();
  }

  @Post()
  create(@Body() dto: CreateMantenimientoDto) {
    return this.mantenimientosService.crearMantenimiento(dto);
  }

  @Get("types")
  getMantenimientoTypes() {
    return this.mantenimientosService.obtenerTiposMantenimiento();
  }
}
