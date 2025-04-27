export class PurchaseBoletoDto {
    id_cliente: number;
    id_empleado: number;
    id_destino: number;
    id_ruta: number;
    fecha_salida: string;
    id_metodo_pago: number;
    valor: number;
    numero_asiento: number;
}
