import { IsString, IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateRutaDto {
    @IsString()
    @IsNotEmpty()
    Nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNumber()
    @IsPositive()
    distancia: number;

    @IsString()
    @IsNotEmpty()
    tiempo_estimado: string;  // Aquí estamos asumiendo que el formato es string (puedes usar Date si lo prefieres)

    @IsInt()
    @IsPositive()
    id_ciudad_origen: number;

    @IsInt()
    @IsPositive()
    id_ciudad_destino: number;
}
