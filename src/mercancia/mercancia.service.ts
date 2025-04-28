// mercancia/mercancia.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateMercanciaDto, UpdateMercanciaDto } from './dto/mercancia.dto';

@Injectable()
export class MercanciaService {
    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    ) { }

 
    async getMercancia() {
        return this.dataSource.query(`
            SELECT
                m.id_mercancia AS id,
                m.descripcion,
                m.peso,
                m.valor_estimado,
                m.id_cliente,
                m.id_viaje
            FROM 
                Mercancia m
            JOIN 
                Cliente c ON m.id_cliente = c.id_cliente
            JOIN 
                Viajes v ON m.id_viaje = v.id_viaje;
        `);
    }


    async createMercancia(dto: CreateMercanciaDto) {
        const {
            descripcion,
            peso,
            valor_estimado,
            id_cliente,
            id_viaje,
        } = dto;

        await this.dataSource.query(`
            INSERT INTO Mercancia 
            (descripcion, peso, valor_estimado, id_cliente, id_viaje)
            VALUES (?, ?, ?, ?, ?)
        `, [descripcion, peso, valor_estimado, id_cliente, id_viaje]);

        const [mercancia] = await this.dataSource.query(
            `SELECT * FROM Mercancia WHERE descripcion = ? AND id_cliente = ?`,
            [descripcion, id_cliente],
        );

        return mercancia;
    }


    async deleteMercancia(id_mercancia: number) {
        const [existing] = await this.dataSource.query(
            `SELECT id_mercancia FROM Mercancia WHERE id_mercancia = ?`,
            [id_mercancia],
        );

        if (!existing) {
            throw new NotFoundException(`Mercancia con id ${id_mercancia} no encontrada`);
        }

        await this.dataSource.query(
            `DELETE FROM Mercancia WHERE id_mercancia = ?`,
            [id_mercancia],
        );

        return { deleted: true };
    }
}
