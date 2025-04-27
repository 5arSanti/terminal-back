import { IsNotEmpty } from "class-validator";

export class PurchaseBoletoDto {
    @IsNotEmpty()
    id_cliente: number;

    @IsNotEmpty()
    id_empleado: number;

    @IsNotEmpty()
    id_destino: number;

    @IsNotEmpty()
    id_ruta: number;

    @IsNotEmpty()
    fecha_salida: Date;

    @IsNotEmpty()
    id_metodo_pago: number;

    @IsNotEmpty()
    valor: number;
}
