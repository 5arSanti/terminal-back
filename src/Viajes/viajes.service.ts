import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ViajesService {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) { }

  // Obtener todos los viajes
  async getViajes() {
    return this.dataSource.query(`
      SELECT 
        v.id_viaje,
        v.Fecha_salida,
        v.Valor,
        r.Nombre AS ruta,
        b.Placa AS placa,
        b.Marca AS marca,
        c_origen.Nombre AS ciudad_origen,
        c_destino.Nombre AS ciudad_destino
      FROM 
        Viajes v
      JOIN 
        Rutas r ON v.id_ruta = r.id_ruta
      JOIN 
        Buses b ON v.id_bus = b.Placa
      JOIN 
        Ciudades c_origen ON v.id_ciudad_origen = c_origen.id_ciudad
      JOIN 
        Ciudades c_destino ON v.id_ciudad_destino = c_destino.id_ciudad;
    `);
  }
}
