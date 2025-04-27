import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateBusDto {
    @IsNotEmpty()
    @IsString()
    placa: string;

    @IsNotEmpty()
    @IsString()
    marca: string;

    @IsNotEmpty()
    @IsNumber()
    capacidad: number;

    @IsNotEmpty()
    @IsNumber()
    id_tipo_bus: number;
    
    @IsNotEmpty()
    @IsNumber()
    id_empresa: number;
    
    @IsOptional()
    @IsNumber()
    id_empleado?: number;
}



export class UpdateBusDto extends PartialType(CreateBusDto) { }
