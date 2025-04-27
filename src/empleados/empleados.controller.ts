import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';

@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) { }

  @Get()
  getEmpleados() {
    return this.empleadosService.getEmpleados();
  }

  @Get(':cedula_empleado')
  getEmpleado(@Param('cedula_empleado') cedula: number) {
    return this.empleadosService.getEmpleadoById(cedula);
  }

  @Post()
  createEmpleado(@Body() body: any) {
    return this.empleadosService.createEmpleado(body);
  }

  @Put(':cedula_empleado')
  updateEmpleado(
    @Param('cedula_empleado') cedula: number,
    @Body() body: any
  ) {
    return this.empleadosService.updateEmpleado(cedula, body);
  }

  @Delete(':cedula_empleado')
  deleteEmpleado(@Param('cedula_empleado') cedula: number) {
    return this.empleadosService.deleteEmpleado(cedula);
  }
}
