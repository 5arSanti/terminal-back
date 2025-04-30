
import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';


@UseGuards(JwtAuthGuard)
@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) { }

  @Get()
  getAll() {
    return this.viajesService.getViajes();
  }
}








