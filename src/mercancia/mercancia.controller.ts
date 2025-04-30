import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { MercanciaService } from './mercancia.service';
import { CreateMercanciaDto, UpdateMercanciaDto } from './dto/mercancia.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';  // Asegúrate de importar el guard JWT

@UseGuards(JwtAuthGuard)
@Controller('mercancia')  // La ruta base es /mercancia
export class MercanciaController {
  constructor(private readonly mercanciaService: MercanciaService) {}

  @Get()  // GET /mercancia
  getAll() {
    return this.mercanciaService.getMercancia();
  }

  @Post()  // POST /mercancia
  create(@Body() dto: CreateMercanciaDto) {
    return this.mercanciaService.createMercancia(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMercanciaDto) {
    return this.mercanciaService.updateMercancia(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.mercanciaService.deleteMercancia(id);
  }
}
