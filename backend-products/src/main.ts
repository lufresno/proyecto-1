import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Añade esto para permitir peticiones externas
  app.enableCors({
    origin: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();