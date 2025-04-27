import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DestinosService {
  constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) {}

  async getDestinos() {
    return await this.dataSource.query(`SELECT * FROM Destinos`);
  }
}
