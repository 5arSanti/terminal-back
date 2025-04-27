import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DestinosService {
  constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

  async getDestinos() {
    return await this.dataSource.query(`SELECT * FROM Destinos`);
  }

  async getDetalleDestinosRutas() {
    return this.dataSource.query(`
      SELECT
        ddr.id_destino,
        dest.Nombre AS nombre_destino,
        ddr.id_ruta,
        r.Nombre AS nombre_ruta
      FROM Detalle_Destinos_Rutas ddr
      JOIN Destinos dest
        ON ddr.id_destino = dest.id_destino
      JOIN Rutas r
        ON ddr.id_ruta = r.id_ruta
      ORDER BY dest.Nombre, r.Nombre;
    `);
  }
}
