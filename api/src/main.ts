import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import expressSession from 'express-session';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function globalSetup(app: NestExpressApplication) {
  const prismaService = app.get(PrismaService);
  const config = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
    methods: '*',
  });

  const sessionSecret = config.get<string>('SESSION_SECRET', '');

  app.use(
    expressSession({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      },
      name: 'CHAT_APP_SESSION',
      secret: sessionSecret,
      resave: true,
      saveUninitialized: false,
      store: new PrismaSessionStore(prismaService, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );
}

function getSwaggerDocumentConfiguration(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  return document;
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  globalSetup(app);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3001);
  const getENV = configService.get('NODE_ENV', 'development');

  if (getENV === 'development') {
    const document = getSwaggerDocumentConfiguration(app);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(port);
}

bootstrap();
