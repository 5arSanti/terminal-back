import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto/empresas.dto';

@Injectable()
export class EmpresasService {
    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) { }

    async obtenerEmpresas() {
        const query = `
            SELECT * FROM Empresas
            WHERE deleted_at IS NULL
        `;
        return await this.dataSource.query(query);
    }

    async crearEmpresa(empresa: CreateEmpresaDto) {
        const query = `
            INSERT INTO Empresas (Nombre, Telefono, Correo, Direccion, id_tipo_empresa)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            empresa.nombre,
            empresa.telefono,
            empresa.correo,
            empresa.direccion,
            empresa.id_tipo_empresa,
        ];
        await this.dataSource.query(query, values);
        return { message: 'Empresa creada exitosamente' };
    }

    async actualizarEmpresa(id: number, empresa: UpdateEmpresaDto) {
        const campos = [];
        const valores = [];

        for (const key in empresa) {
            campos.push(`${key} = ?`);
            valores.push((empresa as any)[key]);
        }

        if (campos.length === 0) return { message: 'No hay campos para actualizar' };

        const query = `
            UPDATE Empresas
            SET ${campos.join(', ')}
            WHERE id_empresa = ? AND deleted_at IS NULL
        `;
        valores.push(id);

        await this.dataSource.query(query, valores);
        return { message: 'Empresa actualizada exitosamente' };
    }

    async eliminarEmpresa(id: number) {
        const query = `
            UPDATE Empresas SET deleted_at = NOW()
            WHERE id_empresa = ? AND deleted_at IS NULL
        `;
        await this.dataSource.query(query, [id]);
        return { message: 'Empresa eliminada correctamente' };
    }
}
