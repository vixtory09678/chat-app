import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import expressSession from 'express-session';
import { ConfigService } from '@nestjs/config';

async function globalSetup(app: NestExpressApplication) {
  const prismaService = app.get(PrismaService);
  const config = app.get(ConfigService);

  const sessionSecret = config.get<string>('SESSION_SECRET', '');

  app.use(
    expressSession({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      },
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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  globalSetup(app);
  await app.listen(3000);
}

bootstrap();
