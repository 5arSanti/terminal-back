import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateEnvioCheckoutDto } from './dto/envios.dto';

@Injectable()
export class EnviosService {
    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) { }

    async crearEnvioConCheckout(dto: CreateEnvioCheckoutDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Crear el envío
            const envioInsert = await queryRunner.query(
                `INSERT INTO Envios (id_remitente, id_destinatario, peso, id_ciudad_origen, id_ciudad_destino)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    dto.id_remitente,
                    dto.id_destinatario,
                    dto.peso,
                    dto.id_ciudad_origen,
                    dto.id_ciudad_destino,
                ]
            );

            const id_envio = envioInsert.insertId;

            // Crear el checkout
            await queryRunner.query(
                `INSERT INTO Checkout (id_envio, id_metodo_pago) VALUES (?, ?)`,
                [id_envio, dto.id_metodo_pago]
            );

            await queryRunner.commitTransaction();
            return { message: 'Envío y checkout creados correctamente' };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error('Error al crear el envío y el checkout: ' + error.message);
        } finally {
            await queryRunner.release();
        }
    }

    async obtenerEnviosConDetalle(): Promise<any[]> {
        const query = `
            SELECT
                e.id_envio,
                e.peso,
                rem.id_cliente          AS id_remitente,
                rem.Nombres             AS nombre_remitente,
                rem.Apellidos           AS apellidos_remitente,
                des.id_cliente          AS id_destinatario,
                des.Nombres             AS nombre_destinatario,
                des.Apellidos           AS apellidos_destinatario,
                co.id_ciudad            AS id_ciudad_origen,
                co.Nombre               AS ciudad_origen,
                cd.id_ciudad            AS id_ciudad_destino,
                cd.Nombre               AS ciudad_destino,
                c.id_checkout,
                c.id_metodo_pago,
                mp.Nombre               AS metodo_pago
            FROM Envios e
                INNER JOIN Checkout c ON c.id_envio = e.id_envio
                INNER JOIN Cliente rem ON rem.id_cliente = e.id_remitente
                INNER JOIN Cliente des ON des.id_cliente = e.id_destinatario
                INNER JOIN Ciudades co ON co.id_ciudad   = e.id_ciudad_origen
                INNER JOIN Ciudades cd ON cd.id_ciudad   = e.id_ciudad_destino
                INNER JOIN Metodo_pago mp ON mp.id_metodo_pago = c.id_metodo_pago
            ORDER BY e.id_envio DESC
        `;
        return this.dataSource.query(query);
    }
}
