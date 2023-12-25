import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(PORT);
}

bootstrap()
  .then( () => console.log(`Application start on ${PORT} port`) )
  .catch( (error) => console.error(`Error call Bootstrap(): ${error}`) );