import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = 3000;

  const config = new DocumentBuilder()
    .setTitle('Bar do Gui')
    .setDescription(
      'Sistema de gerenciamento feito com NestJS e Prisma. autor Guilherme Mattoso',
    )
    .setVersion('1.1.0')
    .addTag('bardogui')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || port, () => {
    console.log(`Rodando neste endereço: http://localhost:${port}/api`);


  });
}
bootstrap();
