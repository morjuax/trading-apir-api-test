import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tableLogRoutes } from './helpers/utils';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV;
  const port = process.env.PORT || 3000;
  const globalPrefix = ``;
  const name = 'trading-pair-api';

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  if (env === 'dev') {
    const config = new DocumentBuilder()
      .setTitle('Trading Api')
      .setDescription('Test Trading Api')
      .setVersion('1.0')
      .addTag('OrderBook')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document, {
      explorer: true,
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
        persistAuthorization: true,
      },
    });
  }

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
