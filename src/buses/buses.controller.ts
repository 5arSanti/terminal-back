// buses/buses.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBusDto, UpdateBusDto } from './dto/buses.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) { }

  @Get()
  getAll() {
    return this.busesService.getBuses();
  }

  @Post()
  create(@Body() dto: CreateBusDto) {
    return this.busesService.createBus(dto);
  }

  @Put(':placa')
  update(@Param('placa') placa: string, @Body() dto: UpdateBusDto) {
    return this.busesService.updateBus(placa, dto);
  }

  @Delete(':placa')
  delete(@Param('placa') placa: string) {
    return this.busesService.deleteBus(placa);
  }
}
