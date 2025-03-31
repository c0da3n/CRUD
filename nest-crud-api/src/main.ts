import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swagger from './swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3000);
  const NODE_ENV = config.get<string>('NODE_ENV', 'production');

  if (NODE_ENV === 'development') {
    swagger(app);
    Logger.log(
      `Swagger is running on: http://localhost:${port}/api`,
      'Swagger',
    );
  }
  swagger(app);
  await app.listen(port);
  Logger.log(`Server is running on: http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
