import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PurchaseBoletoDto } from './dto/boletos.dto';

@Injectable()
export class BoletosService {
    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

    async getBoletos() {
        const query = `SELECT * FROM Boletos`;

        return await this.dataSource.query(query);
    }

    async purchaseBoleto(dto: PurchaseBoletoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const {
                id_cliente,
                id_empleado,
                id_destino,
                id_ruta,
                fecha_salida,
                id_metodo_pago,
                valor,
                numero_asiento,
            } = dto;

            const buses = await queryRunner.query(
                `SELECT id_bus FROM Detalle_Buses_Rutas WHERE id_ruta = ?`,
                [id_ruta],
            );
            if (buses.length === 0) {
                throw new BadRequestException('No hay buses asignados a esa ruta');
            }
            const placaBus = buses[0].id_bus;

            const viajeResult = await queryRunner.query(
                `INSERT INTO Viajes
                (Fecha_salida, Valor, id_bus, id_conductor, id_ruta, id_ciudad_origen, id_ciudad_destino)
                
                VALUES (?, ?, ?, ?, ?, 
                    (SELECT id_ciudad_origen FROM Destinos WHERE id_destino = ?),
                    (SELECT id_ciudad_destino FROM Destinos WHERE id_destino = ?)
                )`,
                [fecha_salida, valor, placaBus, id_empleado, id_ruta, id_destino, id_destino],
            );

            const id_viaje = viajeResult.insertId;

            const boletoResult = await queryRunner.query(
                `INSERT INTO Boletos
              (Numero_asiento, id_destino, id_empresa, id_bus, id_ruta)
             VALUES (?, ?, 
               (SELECT id_empresa FROM Destinos d
                  JOIN Modulos m ON d.id_modulo = m.id_modulo
                  JOIN Empresas e ON m.id_sede = e.id_tipo_empresa /*ajusta si la relación es distinta*/
                WHERE d.id_destino = ?),
               ?, ?
             )`,
                [numero_asiento, id_destino, id_destino, placaBus, id_ruta],
            );
            const id_boleto = boletoResult.insertId;


            const factura = await queryRunner.query(
                `INSERT INTO Factura
                (Valor_total, lleva_mercancia, id_cliente, id_empleado, id_boleto, id_viaje, id_metodo_pago)
                VALUES (?, FALSE, ?, ?, ?, ?, ?)`,
                [valor, id_cliente, id_empleado, id_boleto, id_viaje, id_metodo_pago],
            );

            await queryRunner.commitTransaction();

            return {
                message: 'Compra completada',
                factura
            };
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
