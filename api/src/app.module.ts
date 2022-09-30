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
import { RoomController } from './room/room.controller';
import { RoomService } from './room/room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { useMongoConfiguration } from './configuration/mongo.config';
import { Room, RoomSchema } from './room-message/room-message.schema';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        useMongoConfiguration(configService),
    }),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [AppController, AuthController, UserController, RoomController],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    UserService,
    WorkerService,
    RoomService,
  ],
})
export class AppModule {}
