import { Controller, Get, Post, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { RutasService } from './rutas.service';  // Asegúrate de importar el servicio correctamente

@Controller('rutas')
export class RutasController {
    
    constructor(private readonly rutasService: RutasService) {}

    // Método para obtener todas las rutas
    @Get()
    async getRutas() {
        try {
            // Llamada al servicio para obtener las rutas
            const rutas = await this.rutasService.getRutas();
            return rutas;
        } catch (error) {
            // Si ocurre un error, lanzamos una excepción HTTP con el mensaje y código de estado adecuado
            throw new HttpException(
                'Error al obtener las rutas: ' + error.message, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Método para crear una nueva ruta
    @Post()
    async crearRuta(@Body() rutaData: { 
        Nombre: string;
        descripcion: string;
        distancia: number;
        tiempo_estimado: string;
        id_ciudad_origen: number;
        id_ciudad_destino: number;
    }) {
        try {
            // Llamada al servicio para crear la ruta
            const nuevaRuta = await this.rutasService.crearRuta(rutaData);
            return nuevaRuta;
        } catch (error) {
            // Si ocurre un error, lanzamos una excepción HTTP con el mensaje y código de estado adecuado
            throw new HttpException(
                'Error al crear la ruta: ' + error.message, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Método para eliminar una ruta
    @Delete(':id')
    async eliminarRuta(@Param('id') id: number) {
        try {
            // Llamada al servicio para eliminar la ruta por id
            const resultado = await this.rutasService.eliminarRuta(id);
            if (resultado) {
                return { message: 'Ruta eliminada correctamente' };
            } else {
                throw new HttpException('Ruta no encontrada', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            // Si ocurre un error, lanzamos una excepción HTTP con el mensaje y código de estado adecuado
            throw new HttpException(
                'Error al eliminar la ruta: ' + error.message, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
