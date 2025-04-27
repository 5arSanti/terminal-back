import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import appConfigurations from './config/app.config';
import { UsersModule } from './users/users.module';
import { BusesModule } from './buses/buses.module';
import { SedesModule } from './sedes/sedes.module';
import { EnviosModule } from './envios/envios.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { CiudadesModule } from './ciudades/ciudades.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfigurations],

    }),
    AuthModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    DatabaseModule,
    BusesModule,
    SedesModule,
    EnviosModule,
    EmpleadosModule,
    CiudadesModule,
  ],
})
export class AppModule { }
