// viajes/dto/viajes.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateViajeDto {
  @IsNotEmpty()
  @IsDateString()
  Fecha_salida: string;  // Fecha de salida en formato ISO string

  @IsNotEmpty()
  @IsNumber()
  Valor: number;  // Valor del viaje

  @IsNotEmpty()
  @IsString()
  id_bus: string;  // Placa del bus

  @IsNotEmpty()
  @IsNumber()
  id_conductor: number;  // ID del conductor

  @IsNotEmpty()
  @IsNumber()
  id_ruta: number;  // ID de la ruta

  @IsNotEmpty()
  @IsNumber()
  id_ciudad_origen: number;  // ID de la ciudad de origen

  @IsNotEmpty()
  @IsNumber()
  id_ciudad_destino: number;  // ID de la ciudad de destino
}
