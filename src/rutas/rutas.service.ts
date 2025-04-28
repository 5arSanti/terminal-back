import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RutasService {

    constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}

    // Método para obtener todas las rutas
    async getRutas() {
        return this.dataSource.query(`
            SELECT
                r.id_ruta,
                r.Nombre,
                r.descripcion,
                r.distancia,
                r.tiempo_estimado,
                c_origen.nombre_ciudad AS ciudad_origen,
                c_destino.nombre_ciudad AS ciudad_destino
            FROM Rutas r
                JOIN Ciudades c_origen ON r.id_ciudad_origen = c_origen.id_ciudad
                JOIN Ciudades c_destino ON r.id_ciudad_destino = c_destino.id_ciudad;
        `);
    }
    

    // Método para crear una nueva ruta
    async crearRuta(rutaData: { 
        Nombre: string;
        descripcion: string;
        distancia: number;
        tiempo_estimado: string;
        id_ciudad_origen: number;
        id_ciudad_destino: number;
    }) {
        try {
            const { Nombre, descripcion, distancia, tiempo_estimado, id_ciudad_origen, id_ciudad_destino } = rutaData;
            
            // Inserción en la base de datos
            const result = await this.dataSource.query(`
                INSERT INTO Rutas (Nombre, descripcion, distancia, tiempo_estimado, id_ciudad_origen, id_ciudad_destino)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [Nombre, descripcion, distancia, tiempo_estimado, id_ciudad_origen, id_ciudad_destino]);

            return result; // Retorna el resultado de la inserción
        } catch (error) {
            throw new Error('Error al crear la ruta: ' + error.message);
        }
    }

    // Método para eliminar una ruta por ID
    async eliminarRuta(id: number) {
        try {
            // Eliminar la ruta por su id
            const result = await this.dataSource.query(`
                DELETE FROM Rutas WHERE id_ruta = ?
            `, [id]);

            // Retorna el resultado de la eliminación
            return result.affectedRows > 0; // Si affectedRows es mayor que 0, la eliminación fue exitosa
        } catch (error) {
            throw new Error('Error al eliminar la ruta: ' + error.message);
        }
    }
}
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RutasService {

    constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}

    // Método para obtener todas las rutas
    async getRutas() {
        return this.dataSource.query(`
            SELECT
                r.id_ruta,
                r.Nombre,
                r.descripcion,
                r.distancia,
                r.tiempo_estimado,
                c_origen.nombre_ciudad AS ciudad_origen,
                c_destino.nombre_ciudad AS ciudad_destino
            FROM Rutas r
                JOIN Ciudades c_origen ON r.id_ciudad_origen = c_origen.id_ciudad
                JOIN Ciudades c_destino ON r.id_ciudad_destino = c_destino.id_ciudad;
        `);
    }
    

    // Método para crear una nueva ruta
    async crearRuta(rutaData: { 
        Nombre: string;
        descripcion: string;
        distancia: number;
        tiempo_estimado: string;
        id_ciudad_origen: number;
        id_ciudad_destino: number;
    }) {
        try {
            const { Nombre, descripcion, distancia, tiempo_estimado, id_ciudad_origen, id_ciudad_destino } = rutaData;
            
            // Inserción en la base de datos
            const result = await this.dataSource.query(`
                INSERT INTO Rutas (Nombre, descripcion, distancia, tiempo_estimado, id_ciudad_origen, id_ciudad_destino)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [Nombre, descripcion, distancia, tiempo_estimado, id_ciudad_origen, id_ciudad_destino]);

            return result; // Retorna el resultado de la inserción
        } catch (error) {
            throw new Error('Error al crear la ruta: ' + error.message);
        }
    }

    // Método para eliminar una ruta por ID
    async eliminarRuta(id: number) {
        try {
            // Eliminar la ruta por su id
            const result = await this.dataSource.query(`
                DELETE FROM Rutas WHERE id_ruta = ?
            `, [id]);

            // Retorna el resultado de la eliminación
            return result.affectedRows > 0; // Si affectedRows es mayor que 0, la eliminación fue exitosa
        } catch (error) {
            throw new Error('Error al eliminar la ruta: ' + error.message);
        }
    }
}
