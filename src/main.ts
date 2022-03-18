import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tableLogRoutes } from './helpers/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV;
  const port = process.env.PORT || 3000;
  const globalPrefix = ``;
  const name = 'trading-pair-api';

  await app.listen(port);

  console.log(`\nService listening at http://localhost:${port}`);
  console.log(
    `\x1b[33mstarting  the microservice [ ${name} ]. at ${Date().toString()}`,
  );
  console.log(`\x1b[32mrunning environment NODE_ENV=${env}`);

  if (env !== 'production') {
    tableLogRoutes(app.getHttpServer(), globalPrefix);
  }
}
bootstrap();
