import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RutasService {
  constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) {}

  async getRutasConParadas() {
    return this.dataSource.query(`
      SELECT
        r.id_ruta,
        r.Nombre AS nombre_ruta,
        pi.Nombre_parada AS parada_intermedia
      FROM Rutas r
      JOIN Paradas_intermedias pi
        ON r.id_paradas_intermedias = pi.id_parada
    `);
  }
}
