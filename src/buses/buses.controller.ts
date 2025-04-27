import { Controller, Get } from '@nestjs/common';
import { BusesService } from './buses.service';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Get()
  getBuses() {
    return this.busesService.getBuses();
  }
}
