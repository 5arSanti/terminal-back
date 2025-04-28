
import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { UpdateViajeDto } from './dto/viajes.dto'; // Asegúrate de tener este DTO definido


@UseGuards(JwtAuthGuard)  
@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}


  @Get()
  getAll() {
  
    try {
      return this.viajesService.getViajes();
    } catch (error) {
      throw new Error(`Error al obtener los viajes: ${error.message}`);
    }}


  @Put(':id_viaje')
  async update(
    @Param('id_viaje') id_viaje: number,  
    @Body() updateViajeDto: UpdateViajeDto,  
  ) {
    return this.viajesService.updateViaje(id_viaje, updateViajeDto);  
  }
}








