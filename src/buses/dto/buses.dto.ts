import { PartialType } from '@nestjs/mapped-types';


export class CreateBusDto {
    placa: string;
    marca: string;
    capacidad: number;
    id_tipo_bus: number;
    id_empresa: number;
    id_empleado?: number; // opcional
}



export class UpdateBusDto extends PartialType(CreateBusDto) { }
