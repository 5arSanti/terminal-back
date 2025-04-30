import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateMantenimientoDto } from './dto/mantenimientos.dto';

@Injectable()
export class MantenimientosService {
    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) { }

    async obtenerMantenimientos() {
        const query = `
            SELECT * FROM Mantenimientos
            WHERE id_bus IN (
                SELECT Placa FROM Buses WHERE deleted_at IS NULL
            )
        `;
        const result = await this.dataSource.query(query);
        return result;
    }

    async crearMantenimiento(dto: CreateMantenimientoDto) {
        const query = `
            INSERT INTO Mantenimientos (Descripcion, Fecha_mantenimiento, id_tipo_mantenimiento, id_bus)
            VALUES (?, ?, ?, ?)
        `;
        await this.dataSource.query(query, [
            dto.descripcion,
            dto.fecha_mantenimiento,
            dto.id_tipo_mantenimiento,
            dto.id_bus,
        ]);
        return { message: 'Mantenimiento creado correctamente' };
    }

    async obtenerTiposMantenimiento() {
        const query = `
            SELECT * FROM Tipo_mantenimiento
        `;
        const result = await this.dataSource.query(query);
        return result;
    }
}
