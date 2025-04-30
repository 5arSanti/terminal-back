import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMantenimientoDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_mantenimiento: string;

  @IsInt()
  @IsNotEmpty()
  id_tipo_mantenimiento: number;

  @IsString()
  @IsNotEmpty()
  id_bus: string;
}
