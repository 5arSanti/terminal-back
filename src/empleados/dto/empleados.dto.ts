import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";

export class EmpleadoDto {
    @IsNotEmpty()
    cedula_empleado: number;
    
    @IsNotEmpty()
    Nombres: string;
    
    @IsNotEmpty()
    Apellidos: string;
    
    @IsNotEmpty()
    Telefono: string;
    
    @IsNotEmpty()
    Correo: string;
    
    @IsNotEmpty()
    id_ciudad_origen: number;
    
    @IsNotEmpty()
    id_ciudad_residencia: number;
    
    @IsNotEmpty()
    id_tipo_empleado: number;
    
    @IsNotEmpty()
    id_sede: number;
}

export class UpdateEmpleadoDto extends PartialType(EmpleadoDto) {
    cedula_empleado: number;
}


export class CreateTipoEmpleadoDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    descripcion: string;
}