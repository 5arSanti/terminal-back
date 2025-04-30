import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEnvioCheckoutDto {
  @IsInt()
  @IsNotEmpty()
  id_remitente: number;

  @IsInt()
  @IsNotEmpty()
  id_destinatario: number;

  @IsNotEmpty()
  peso: number;

  @IsInt()
  @IsNotEmpty()
  id_ciudad_origen: number;

  @IsInt()
  @IsNotEmpty()
  id_ciudad_destino: number;

  @IsInt()
  @IsNotEmpty()
  id_metodo_pago: number;
}
