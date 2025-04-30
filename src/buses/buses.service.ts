// buses/buses.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateBusDto, UpdateBusDto } from './dto/buses.dto';

@Injectable()
export class BusesService {
    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    ) { }

    async getBuses() {
        return this.dataSource.query(` 
            SELECT
                b.Placa,
                b.Marca,
                b.Capacidad,
                tb.Nombre AS Tipo_bus,
                e.Nombre AS Empresa,
                CONCAT(emp.Nombres, ' ', emp.Apellidos) AS Empleado
            
            FROM Buses b
                JOIN Tipo_bus tb ON b.id_tipo_bus = tb.id_tipo_bus
                JOIN Empresas e ON b.id_empresa = e.id_empresa
                LEFT JOIN Empleados emp ON b.id_empleado = emp.cedula_empleado
            WHERE deleted_at IS NULL
            GROUP BY
                b.Placa, b.Marca, b.Capacidad, tb.Nombre, e.Nombre, emp.Nombres, emp.Apellidos;
        `);
    }

    async createBus(dto: CreateBusDto) {
        const {
            placa,
            marca,
            capacidad,
            id_tipo_bus,
            id_empresa,
            id_empleado = null,
        } = dto;

        await this.dataSource.query(`
            INSERT INTO Buses
            (Placa, Marca, Capacidad, id_tipo_bus, id_empresa, id_empleado)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [placa, marca, capacidad, id_tipo_bus, id_empresa, id_empleado]);

        const [bus] = await this.dataSource.query(
            `SELECT * FROM Buses WHERE Placa = ?`,
            [placa],
        );
        return bus;
    }

    async updateBus(placa: string, dto: UpdateBusDto) {
        const [existing] = await this.dataSource.query(
            `SELECT Placa FROM Buses WHERE Placa = ?`,
            [placa],
        );
        if (!existing) {
            throw new NotFoundException(`Bus con placa ${placa} no encontrado`);
        }

        const fields = [];
        const params = [];

        for (const [key, value] of Object.entries(dto)) {
            fields.push(`${key} = ?`);
            params.push(value);
        }
        if (fields.length === 0) {
            return;
        }
        params.push(placa);

        await this.dataSource.query(
            `UPDATE Buses SET ${fields.join(', ')} WHERE Placa = ?`,
            params,
        );

        const [updated] = await this.dataSource.query(
            `SELECT * FROM Buses WHERE Placa = ?`,
            [placa],
        );
        return updated;
    }

    async deleteBus(placa: string) {
        const [existing] = await this.dataSource.query(
            `SELECT Placa FROM Buses WHERE Placa = ?`,
            [placa],
        );

        if (!existing) {
            throw new NotFoundException(`Bus con placa ${placa} no encontrado`);
        }

        await this.dataSource.query(
            `UPDATE Buses SET deleted_at = NOW() WHERE Placa = ?`,
            [placa],
        );
        return { deleted: true };
    }

    async getBusTypes() {
        return this.dataSource.query(`
            SELECT *
            FROM Tipo_bus
        `);
    }

    async createBusType(dto: { nombre: string }) {
        const { nombre } = dto;

        await this.dataSource.query(`
            INSERT INTO Tipo_bus (Nombre)
            VALUES (?)
        `, [nombre]);

        return { message: "Tipo de bus creado con éxito" };
    }
}
