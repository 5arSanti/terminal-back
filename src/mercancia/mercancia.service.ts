import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MercanciaService {

    constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}

    async getMercancia() {
        const mercancia = await this.dataSource.query(`
            SELECT * FROM Mercancia
        `);

        return mercancia;
    }
}
