import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class EmpleadosService {
    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

    // Obtener todos los empleados
    async getEmpleados() {
        return await this.dataSource.query(`
            SELECT *
            FROM Empleados
        `);
    }

    // Obtener un empleado por cédula
    async getEmpleadoById(cedula_empleado: number) {
        const result = await this.dataSource.query(`
            SELECT *
            FROM Empleados
            WHERE cedula_empleado = ?
        `, [cedula_empleado]);

        return result[0];
    }

    async createEmpleado(data: {
        cedula_empleado: number;
        Nombres: string;
        Apellidos: string;
        Telefono: string;
        Correo: string;
        id_ciudad_origen: number;
        id_ciudad_residencia: number;
        id_tipo_empleado: number;
        id_sede: number;
    }) {
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

    // Editar un empleado
    async updateEmpleado(cedula_empleado: number, data: {
        Nombres?: string;
        Apellidos?: string;
        Telefono?: string;
        Correo?: string;
        id_ciudad_origen?: number;
        id_ciudad_residencia?: number;
        id_tipo_empleado?: number;
        id_sede?: number;
    }) {
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
}
