import { PrismaClient, User } from '@prisma/client';
import { Connection } from 'mongoose';
import { Room } from '../room-message/room-message.schema';
import { createUser } from './fixtures/user.fixtures';

export const createUserDb = async (
  prisma: PrismaClient,
  user?: Partial<User>,
) => {
  return prisma.user.create({
    data: createUser(user),
  });
};

export const cleanUpDb = async (db: {
  prisma?: PrismaClient;
  mongo?: Connection;
}) => {
  if (db?.prisma) {
    await cleanUpPrismaDb(db?.prisma);
  }
  if (db?.mongo) {
    await cleanUpMongoDb(db?.mongo);
  }
};

export const cleanUpPrismaDb = async (prisma: PrismaClient) => {
  await prisma.chatRoom.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
};

export const cleanUpMongoDb = async (mongo: Connection) => {
  await mongo.deleteModel(Room.name);
};
