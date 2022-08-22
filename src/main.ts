/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT;

  await app
    .listen(PORT, '0.0.0.0')
    .then(() => console.log(`Server start with port ${PORT}`));
}
bootstrap();
