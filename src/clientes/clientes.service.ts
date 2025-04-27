import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ClientesService {

    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

    async getClientes() {
        const query = `SELECT * FROM Clientes`;

        return await this.dataSource.query(query);
    }
}
