import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConnectOptions } from 'mongoose';

export const useMongoConfiguration = (
  configService: ConfigService,
): MongooseModuleFactoryOptions & ConnectOptions => {
  return {
    uri: configService.get('DATABASE_MONGO_URL', 'mongodb://localhost:27017'),
  };
};
