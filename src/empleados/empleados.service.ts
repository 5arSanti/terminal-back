import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateTipoEmpleadoDto, EmpleadoDto, UpdateEmpleadoDto } from './dto/empleados.dto';

@Injectable()
export class EmpleadosService {
    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

    async getEmpleados() {
        return await this.dataSource.query(`
            SELECT *
            FROM Empleados
        `);
    }

    async getEmpleadoById(cedula_empleado: number) {
        const result = await this.dataSource.query(`
            SELECT *
            FROM Empleados
            WHERE cedula_empleado = ?
        `, [cedula_empleado]);

        return result[0];
    }

    async createEmpleado(data: EmpleadoDto) {
        await this.dataSource.query(`
            INSERT INTO Empleados (
                cedula_empleado,
                Nombres,
                Apellidos,
                Telefono,
                Correo,
                id_ciudad_origen,
                id_ciudad_residencia,
                id_tipo_empleado,
                id_sede
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            data.cedula_empleado,
            data.Nombres,
            data.Apellidos,
            data.Telefono,
            data.Correo,
            data.id_ciudad_origen,
            data.id_ciudad_residencia,
            data.id_tipo_empleado,
            data.id_sede
        ]);

        return { message: 'Empleado creado exitosamente' };
    }

    async updateEmpleado(cedula_empleado: number, data: UpdateEmpleadoDto) {
        await this.dataSource.query(`
            UPDATE Empleados
            SET
                Nombres = ?,
                Apellidos = ?,
                Telefono = ?,
                Correo = ?,
                id_ciudad_origen = ?,
                id_ciudad_residencia = ?,
                id_tipo_empleado = ?,
                id_sede = ?
            WHERE cedula_empleado = ?
        `, [
            data.Nombres,
            data.Apellidos,
            data.Telefono,
            data.Correo,
            data.id_ciudad_origen,
            data.id_ciudad_residencia,
            data.id_tipo_empleado,
            data.id_sede,
            cedula_empleado
        ]);

        return { message: 'Empleado actualizado exitosamente' };
    }

    async deleteEmpleado(cedula_empleado: number) {
        await this.dataSource.query(`
            DELETE FROM Empleados
            WHERE cedula_empleado = ?
        `, [cedula_empleado]);

        return { message: 'Empleado eliminado exitosamente' };
    }

    async getTiposEmpleado() {
        return this.dataSource.query(`
            SELECT
                id_tipo_empleado,
                Nombre,
                descripcion
            FROM Tipo_empleado
        `);
    }

    async createTipoEmpleado(data: CreateTipoEmpleadoDto) {
        const { Nombre, descripcion } = data;

        await this.dataSource.query(`
            INSERT INTO Tipo_empleado (Nombre, descripcion)
            VALUES (?, ?)
        `, [Nombre, descripcion]);

        return { message: 'Tipo de empleado creado exitosamente' };
    }
}
