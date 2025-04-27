import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SedesService {

    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

    async getSedes() {
        return await this.dataSource.query(`
            SELECT
                s.id_sede,
                s.Nombre,
                s.Direccion,
                c.id_ciudad,
                c.Nombre AS Ciudad
            FROM Sedes s

            JOIN Ciudades c ON s.id_ciudad = c.id_ciudad
        `)
    }

    async getTiposEmpleadoPorSede(id_sede: number) {
        return await this.dataSource.query(`
            SELECT
                te.id_tipo_empleado,
                te.Nombre AS tipo_empleado,
                te.descripcion,
                COUNT(e.cedula_empleado) AS cantidad_empleados
            FROM Tipo_empleado te
            
            JOIN Empleados e ON te.id_tipo_empleado = e.id_tipo_empleado
                WHERE e.id_sede = ?

            GROUP BY te.id_tipo_empleado, te.Nombre, te.descripcion;
        `, [id_sede]);
    }

    async getModulos() {
        return await this.dataSource.query(`
            SELECT 
                m.id_modulo,
                m.Nombre AS modulo,
                s.Nombre AS sede
            
                FROM Modulos m
            JOIN Sedes s ON m.id_sede = s.id_sede
        `);
    }


    async getDestinos() {
        return await this.dataSource.query(`
            SELECT * FROM Destinos
        `);
    }


    async getParadasIntermedias() {
        return await this.dataSource.query(`
            SELECT * FROM Paradas_intermedias
        `);
    }
}
