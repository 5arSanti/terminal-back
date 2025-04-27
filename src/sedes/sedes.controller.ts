import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('sedes')
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Get()
  getSedes() {
    return this.sedesService.getSedes();
  }

  @Get('details/:id_sede')
  getTiposEmpleadoPorSede(@Param('id_sede') id_sede: number) {
    return this.sedesService.getTiposEmpleadoPorSede(id_sede);
  }

  @Get('modules')
  getModulos() {
    return this.sedesService.getModulos();
  }

  @Get("destinations")
  getDestinos() {
    return this.sedesService.getDestinos();
  }

  @Get("intermediate-stops")
  getParadasIntermedias() {
    return this.sedesService.getParadasIntermedias();
  }

}
