import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CiudadesService {

    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    ) { }

    async getCiudades() {
        return await this.dataSource.query(`
          SELECT
            id_ciudad,
            Nombre
          FROM Ciudades
        `);
    }

    async createCiudad(nombre: string) {
        await this.dataSource.query(`
          INSERT INTO Ciudades (Nombre)
          VALUES (?)
        `, [nombre]);

        return { message: 'Ciudad creada exitosamente' };
    }

}
