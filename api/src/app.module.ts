import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './env.validation';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MqttModule } from 'nest-mqtt';
import { useMqttConfiguration } from './configuration/mqtt.config';
import { WorkerService } from './worker/worker.service';
import { ChatDBService } from './prisma/prisma.mongo.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
    }),
    MqttModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        useMqttConfiguration(configService),
    }),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    UserService,
    WorkerService,
    ChatDBService,
  ],
})
export class AppModule {}
