import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BoletoDto } from './dto/boleto.dto';

@Injectable()
export class BoletosService {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}

  // Método para obtener todos los boletos
  async getBoletos(): Promise<BoletoDto[]> {
    const boletos = await this.dataSource.query(`
      SELECT 
        b.id_boleto, 
        b.numero_asiento, 
        b.precio, 
        b.fecha_compra,
        CONCAT(u.Nombres, ' ', u.Apellidos) AS usuario,
        bus.Placa AS bus_placa,
        r.Nombre AS ruta
      FROM Boletos b
        JOIN Usuarios u ON b.id_usuario = u.id_usuario
        JOIN Buses bus ON b.id_bus = bus.id_bus
        JOIN Rutas r ON b.id_ruta = r.id_ruta
    `);

    return boletos.map(boleto => new BoletoDto(boleto)); // Mapea los boletos a la estructura de BoletoDto
  }

  // Método para obtener boleto por ID
  async getBoletoPorId(id_boleto: number): Promise<BoletoDto> {
    const boleto = await this.dataSource.query(`
      SELECT 
        b.id_boleto, 
        b.numero_asiento, 
        b.precio, 
        b.fecha_compra,
        CONCAT(u.Nombres, ' ', u.Apellidos) AS usuario,
        bus.Placa AS bus_placa,
        r.Nombre AS ruta
      FROM Boletos b
        JOIN Usuarios u ON b.id_usuario = u.id_usuario
        JOIN Buses bus ON b.id_bus = bus.id_bus
        JOIN Rutas r ON b.id_ruta = r.id_ruta
      WHERE b.id_boleto = ?
    `, [id_boleto]);

    if (boleto.length === 0) {
      throw new Error('Boleto no encontrado');
    }

    return new BoletoDto(boleto[0]); // Mapea el boleto encontrado a la estructura de BoletoDto
  }

  // Método para obtener boletos por viaje (bus y ruta)
  async getBoletosPorViaje(id_bus: number, id_ruta: number): Promise<BoletoDto[]> {
    const boletos = await this.dataSource.query(`
      SELECT 
        b.id_boleto, 
        b.numero_asiento, 
        b.precio, 
        b.fecha_compra,
        CONCAT(u.Nombres, ' ', u.Apellidos) AS usuario,
        bus.Placa AS bus_placa,
        r.Nombre AS ruta
      FROM Boletos b
        JOIN Usuarios u ON b.id_usuario = u.id_usuario
        JOIN Buses bus ON b.id_bus = bus.id_bus
        JOIN Rutas r ON b.id_ruta = r.id_ruta
      WHERE b.id_bus = ? AND b.id_ruta = ?
    `, [id_bus, id_ruta]);

    return boletos.map(boleto => new BoletoDto(boleto)); // Mapea los boletos a la estructura de BoletoDto
  }
}
