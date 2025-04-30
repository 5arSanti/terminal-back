import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DepartamentosService {

    constructor(@Inject("DATA_SOURCE") private dataSource: DataSource) { }

    getDepartamentos() {
        return this.dataSource.query(`
            SELECT * FROM Departamentos
        `);
    }
}
