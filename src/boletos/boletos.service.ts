import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PurchaseBoletoDto } from './dto/boletos.dto';

@Injectable()
export class BoletosService {
    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

    async getBoletos() {
        return this.dataSource.query(`SELECT * FROM Boletos`);
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
            } = dto;

            const buses = await queryRunner.query(
                `SELECT id_bus FROM Detalle_Buses_Rutas WHERE id_ruta = ?`,
                [id_ruta],
            );

            if (buses.length === 0) {
                throw new BadRequestException('No hay buses asignados a esa ruta');
            }
            const placaBus = buses[0].id_bus;

            const [busInfo] = await queryRunner.query(
                `SELECT Capacidad FROM Buses WHERE Placa = ?`,
                [placaBus],
            );

            const capacidad = busInfo?.Capacidad;
            if (!capacidad) {
                throw new BadRequestException('No se encontró información de capacidad del bus');
            }

            const viajeResult = await queryRunner.query(`
                INSERT INTO Viajes
                (Fecha_salida, Valor, id_bus, id_conductor, id_ruta, id_ciudad_origen, id_ciudad_destino)
                VALUES (
                    ?, ?, ?, ?, ?,
                    (SELECT id_ciudad_origen FROM Destinos WHERE id_destino = ?),
                    (SELECT id_ciudad_destino FROM Destinos WHERE id_destino = ?)
                )`,
                [fecha_salida, valor, placaBus, id_empleado, id_ruta, id_destino, id_destino],
            );
            const id_viaje = viajeResult.insertId;

            const [{ total }] = await queryRunner.query(
                `SELECT COUNT(*) AS total
                FROM Boletos b
                    JOIN Viajes v ON v.id_viaje = ?

                WHERE b.id_bus = v.id_bus
                AND v.Fecha_salida = ?
                `,
                [id_viaje, fecha_salida],
            );
            const numero_asiento = total + 1;
            if (numero_asiento > capacidad) {
                throw new BadRequestException('No quedan asientos disponibles en este bus');
            }

            const boletoResult = await queryRunner.query(
                `INSERT INTO Boletos
                (Numero_asiento, id_destino, id_empresa, id_bus, id_ruta)
                VALUES (?, ?, 
                (SELECT e.id_empresa
                    FROM Destinos d
                        JOIN Modulos m ON d.id_modulo = m.id_modulo
                        JOIN Empresas e ON m.id_sede = e.id_empresa

                    WHERE d.id_destino = ?
                ), ?, ? )`,
                [numero_asiento, id_destino, id_destino, placaBus, id_ruta],
            );
            const id_boleto = boletoResult.insertId;

            await queryRunner.query(`
                INSERT INTO Factura
                (Valor_total, lleva_mercancia, id_cliente, id_empleado, id_boleto, id_viaje, id_metodo_pago)
                
                VALUES (?, FALSE, ?, ?, ?, ?, ?)`,
                [valor, id_cliente, id_empleado, id_boleto, id_viaje, id_metodo_pago],
            );

            await queryRunner.commitTransaction();
            return { message: 'Compra completada', id_viaje, id_boleto, numero_asiento };
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
