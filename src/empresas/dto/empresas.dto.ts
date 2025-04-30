import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsEmail, Length } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 20)
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsInt()
  @IsNotEmpty()
  id_tipo_empresa: number;
}

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) { }