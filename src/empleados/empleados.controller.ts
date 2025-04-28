import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateTipoEmpleadoDto, EmpleadoDto, UpdateEmpleadoDto } from './dto/empleados.dto';


@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) { }

  @Get()
  getEmpleados() {
    return this.empleadosService.getEmpleados();
  }

  @Get('empleado/:cedula_empleado')
  getEmpleado(@Param('cedula_empleado') cedula: number) {
    return this.empleadosService.getEmpleadoById(cedula);
  }

  @Post()
  createEmpleado(@Body() body: EmpleadoDto) {
    return this.empleadosService.createEmpleado(body);
  }

  @Put('empleado/:cedula_empleado')
  updateEmpleado(@Param('cedula_empleado') cedula: number, @Body() body: UpdateEmpleadoDto) {
    return this.empleadosService.updateEmpleado(cedula, body);
  }

  @Delete('empleado/:cedula_empleado')
  deleteEmpleado(@Param('cedula_empleado') cedula: number) {
    return this.empleadosService.deleteEmpleado(cedula);
  }

  @Get("types")
  getAll() {
    return this.empleadosService.getTiposEmpleado();
  }

  @Post("types")
  create(@Body() body: CreateTipoEmpleadoDto) {
    return this.empleadosService.createTipoEmpleado(body);
  }

}
