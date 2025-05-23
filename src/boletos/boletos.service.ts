// boletos/boletos.service.ts
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PurchaseBoletoDto } from './dto/boletos.dto';

@Injectable()
export class BoletosService {
    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

    async getBoletos() {
        return this.dataSource.query(`
            SELECT 
                bo.id_boleto,
                bo.Numero_asiento,
                d.Nombre AS destino,
                r.Nombre AS ruta,
                bo.id_empresa,
                e.Nombre AS empresa_nombre,
                bo.id_bus,
                bus.Placa AS placa_bus,
                bus.Capacidad AS capacidad_bus,
                emp.Nombres AS conductor_nombre,
                emp.Apellidos AS conductor_apellido,
                v.id_viaje,
                v.Fecha_salida AS fecha_viaje,
                v.id_ciudad_origen,
                co.Nombre AS ciudad_origen,
                v.id_ciudad_destino,
                cd.Nombre AS ciudad_destino,
                mp.Nombre AS metodo_pago,
                f.Valor_total AS valor_factura,
                f.Fecha_facturacion AS fecha_factura
            FROM Boletos bo
            LEFT JOIN Destinos d ON bo.id_destino = d.id_destino
            LEFT JOIN Rutas r ON bo.id_ruta = r.id_ruta
            LEFT JOIN Buses bus ON bo.id_bus = bus.Placa
            LEFT JOIN Empleados emp ON bus.id_empleado = emp.cedula_empleado
            LEFT JOIN Empresas e ON bo.id_empresa = e.id_empresa
            LEFT JOIN Viajes v ON v.id_bus = bo.id_bus AND v.id_ruta = bo.id_ruta
            LEFT JOIN Ciudades co ON v.id_ciudad_origen = co.id_ciudad
            LEFT JOIN Ciudades cd ON v.id_ciudad_destino = cd.id_ciudad
            LEFT JOIN Factura f ON bo.id_boleto = f.id_boleto
            LEFT JOIN Metodo_pago mp ON f.id_metodo_pago = mp.id_metodo_pago
        `);
    }
    async purchaseBoleto(dto: Omit<PurchaseBoletoDto, 'numero_asiento'>) {
        const qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();

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

            const buses = await qr.query(
                `SELECT id_bus FROM Detalle_Buses_Rutas WHERE id_ruta = ?`,
                [id_ruta],
            );
            if (!buses.length) throw new BadRequestException('Sin buses en esa ruta');
            const placaBus = buses[0].id_bus;

            const [busInfo] = await qr.query(
                `SELECT Capacidad FROM Buses WHERE Placa = ?`, [placaBus],
            );

            if (!busInfo) throw new BadRequestException('Bus no encontrado');

            const capacidad = busInfo.Capacidad;

            const viajeRes = await qr.query(
                `INSERT INTO Viajes
                (Fecha_salida, Valor, id_bus, id_conductor, id_ruta, id_ciudad_origen, id_ciudad_destino)
                    VALUES (?, ?, ?, ?, ?,
                    (SELECT id_ciudad_origen FROM Destinos WHERE id_destino = ?),
                    (SELECT id_ciudad_destino FROM Destinos WHERE id_destino = ?)
                )`,
                [fecha_salida, valor, placaBus, id_empleado, id_ruta, id_destino, id_destino],
            );

            const id_viaje = viajeRes.insertId;

            const [{ total }] = await qr.query(
                `SELECT COUNT(*) AS total FROM Boletos
                WHERE id_bus = ? AND id_ruta = ? AND Numero_asiento IS NOT NULL`,
                [placaBus, id_ruta],
            );
            const numero_asiento = total + 1;
            if (numero_asiento > capacidad) throw new BadRequestException('Bus lleno');

            const boletoRes = await qr.query(
                `INSERT INTO Boletos
                (Numero_asiento, id_destino, id_empresa, id_bus, id_ruta)
                    VALUES (?, ?, 
                        (SELECT id_empresa FROM Buses WHERE Placa = ?),
                        ?, ?
                    )`,
                [numero_asiento, id_destino, placaBus, placaBus, id_ruta],
            );
            const id_boleto = boletoRes.insertId;

            const facturaRes = await qr.query(`
                INSERT INTO Factura
                (Valor_total, lleva_mercancia, id_cliente, id_empleado, id_boleto, id_viaje, id_metodo_pago)
                VALUES (?, FALSE, ?, ?, ?, ?, ?)`,
                [valor, id_cliente, id_empleado, id_boleto, id_viaje, id_metodo_pago],
            );
            const id_factura = facturaRes.insertId;

            await qr.commitTransaction();

            const [facturaCompleta] = await this.dataSource.query(`
                SELECT
                f.id_factura,
                f.Fecha_facturacion,
                f.Valor_total,
                mp.Nombre AS metodo_pago,
                CONCAT(c.Nombres, ' ', c.Apellidos) AS cliente,
                CONCAT(e.Nombres, ' ', e.Apellidos) AS empleado,
                v.id_viaje,
                v.Fecha_salida AS fecha_viaje,
                b.id_boleto,
                b.Numero_asiento AS asiento,
                dest.Nombre AS destino,
                r.Nombre AS ruta,
                bus.Placa AS placa_bus,
                bus.Capacidad AS capacidad_bus,
                empb.Nombres AS conductor_nombre,
                empb.Apellidos AS conductor_apellido
                
                FROM Factura f
                    JOIN Metodo_pago mp ON f.id_metodo_pago = mp.id_metodo_pago
                    JOIN Cliente c ON f.id_cliente = c.id_cliente
                    JOIN Empleados e ON f.id_empleado = e.cedula_empleado
                    JOIN Viajes v ON f.id_viaje = v.id_viaje
                    JOIN Boletos b ON f.id_boleto = b.id_boleto
                    JOIN Destinos dest ON b.id_destino = dest.id_destino
                    JOIN Rutas r ON b.id_ruta = r.id_ruta
                    JOIN Buses bus ON v.id_bus = bus.Placa
                    JOIN Empleados empb ON v.id_conductor = empb.cedula_empleado
                WHERE f.id_factura = ?
        `,
                [id_factura],
            );

            return facturaCompleta;
        } catch (err) {
            await qr.rollbackTransaction();
            throw err;
        } finally {
            await qr.release();
        }
    }
}
