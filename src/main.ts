import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = 8000;

  await app
    .listen(PORT, '0.0.0.0')
    .then(() => console.log(`Server start with port ${PORT}`));
}
bootstrap();
