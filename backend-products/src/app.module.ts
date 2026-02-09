import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
 imports: [
   ConfigModule.forRoot({
     isGlobal: true, // Hace que el .env sea accesible en toda la app
   }),
   TypeOrmModule.forRootAsync({
     imports: [ConfigModule],
     inject: [ConfigService],
     useFactory: (configService: ConfigService) => ({
       type: 'postgres',
       host: configService.get<string>('DB_HOST'),
       port: configService.get<number>('DB_PORT', 5432),
       username: configService.get<string>('DB_USER'),
       password: configService.get<string>('DB_PASS'),
       database: configService.get<string>('DB_NAME'),
       autoLoadEntities: true, // Carga automáticamente Product
       synchronize: true, // Sincroniza el código con la DB (cuidado en prod)
       ssl: configService.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
     }),
   }),
   ProductsModule,
 ],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule { }