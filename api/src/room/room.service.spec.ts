import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { createUserDb } from '../test-helper/test.helper';
import { RoomService } from './room.service';

describe('RoomService', () => {
  let roomService: RoomService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    roomService = module.get<RoomService>(RoomService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(roomService).toBeDefined();
  });

  describe('CreateRoom', () => {
    it('should create a room', async () => {
      const createdUser = await createUserDb(prismaService);

      const participants = await Promise.all([
        createUserDb(prismaService),
        createUserDb(prismaService),
        createUserDb(prismaService),
      ]);

      const createdRoom = await roomService.createRoom(
        createdUser.id,
        participants,
      );

      expect(createdRoom.roomName).toEqual(
        [
          createdUser.displayName,
          ...participants.map((user) => user.displayName),
        ].join(', '),
      );
    });
  });
});
