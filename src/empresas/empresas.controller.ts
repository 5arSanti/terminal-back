import { Body, Controller, Get, Param, Patch, Post, Delete, Put } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto/empresas.dto';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) { }

  @Get()
  async obtenerEmpresas() {
    return await this.empresasService.obtenerEmpresas();
  }

  @Post()
  async crearEmpresa(@Body() body: CreateEmpresaDto) {
    return await this.empresasService.crearEmpresa(body);
  }

  @Put(':id')
  async actualizarEmpresa(@Param('id') id: string, @Body() body: UpdateEmpresaDto) {
    return await this.empresasService.actualizarEmpresa(+id, body);
  }

  @Delete(':id')
  async eliminarEmpresa(@Param('id') id: string) {
    return await this.empresasService.eliminarEmpresa(+id);
  }
}
