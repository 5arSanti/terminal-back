import { Controller, Get } from '@nestjs/common';
import { ModulosService } from './modulos.service';

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) { }

  @Get()
  getModulos() {
    return this.modulosService.getModulos();
  }
}
