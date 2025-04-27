import { IsNotEmpty, IsString } from "class-validator";

export class CreateCiudadDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;
}