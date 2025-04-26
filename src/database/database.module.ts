import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'DATA_SOURCE',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const dataSource = new DataSource({
                    type        : 'mysql',
                    host        : configService.get<string>('DB_HOST'),
                    port        : configService.get<number>('DB_PORT'), 
                    username    : configService.get<string>('DB_USER'),
                    password    : configService.get<string>('DB_PASSWORD'),
                    database    : configService.get<string>('DB_NAME'),
                    synchronize : false,
                });

                return dataSource.initialize();
            },
        },
    ],
    exports: ['DATA_SOURCE'],
})
export class DatabaseModule { }
