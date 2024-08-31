import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Equipment API')
    .setDescription('API to manage equipment and their states')
    .setVersion('1.0')
    .addTag('equipment')
    .addTag('equipment-model')
    .addTag('equipment-state')
    .addTag('equipment-state-history')
    .addTag('equipment-position-history')
    .addTag('hourly-earning')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
