import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MetodosPagoService {
    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

    async getMetodosPago() {
        return this.dataSource.query(`
          SELECT
            id_metodo_pago,
            Nombre
          FROM Metodo_pago
          ORDER BY Nombre
        `);
    }
}
