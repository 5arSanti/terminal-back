// mercancia/dto/mercancia.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMercanciaDto {
    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsNumber()
    peso: number;

    @IsNotEmpty()
    @IsNumber()
    valor_estimado: number;

    @IsNotEmpty()
    @IsNumber()
    id_cliente: number;

    @IsNotEmpty()
    @IsNumber()
    id_viaje: number;
}

export class UpdateMercanciaDto extends PartialType(CreateMercanciaDto) {}
