import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ModulosService {

    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }


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
}
