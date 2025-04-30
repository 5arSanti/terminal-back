import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { EmpresasService } from './empresas.service';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) { }

  @Get()
  async obtenerEmpresas() {
    return await this.empresasService.obtenerEmpresas();
  }

  @Post()
  async crearEmpresa(@Body() body) {
    return await this.empresasService.crearEmpresa(body);
  }

  @Patch(':id')
  async actualizarEmpresa(@Param('id') id: string, @Body() body) {
    return await this.empresasService.actualizarEmpresa(+id, body);
  }

  @Delete(':id')
  async eliminarEmpresa(@Param('id') id: string) {
    return await this.empresasService.eliminarEmpresa(+id);
  }
}
