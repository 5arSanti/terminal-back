import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class BusesService {

    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }


    async getBuses() {

        return await this.dataSource.query(`
            SELECT
                b.Placa,
                b.Marca,
                b.Capacidad,
                tb.Nombre AS Tipo_bus,
                e.Nombre AS Empresa,
                CONCAT(emp.Nombres, ' ', emp.Apellidos) AS Empleado
            FROM Buses b
                JOIN Tipo_bus tb
                ON b.id_tipo_bus = tb.id_tipo_bus
                JOIN Empresas e
                ON b.id_empresa = e.id_empresa
                LEFT JOIN Empleados emp
                ON b.id_empleado = emp.cedula_empleado
                LEFT JOIN Mantenimientos m
                ON b.Placa = m.id_bus
            GROUP BY
                b.Placa,
                b.Marca,
                b.Capacidad,
                tb.Nombre,
                e.Nombre,
                emp.Nombres,
                emp.Apellidos;
        `)
    }

}
