import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configuredOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const isProduction = process.env.NODE_ENV === 'production';
  const defaultDevOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://studio.apollographql.com',
    'https://sandbox.embed.apollographql.com',
  ];
  const allowedOrigins =
    configuredOrigins.length > 0
      ? configuredOrigins
      : isProduction
        ? []
        : defaultDevOrigins;
  const corsOrigin =
    allowedOrigins.length === 0
      ? false
      : allowedOrigins.includes('*')
        ? true
        : allowedOrigins;

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
