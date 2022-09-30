import { User } from '@prisma/client';
import faker from 'faker';

export const createUser = (user?: Partial<User>): User => {
  return {
    id: faker.datatype.uuid(),
    displayName: user?.displayName ?? faker.name.lastName(),
    password: user?.displayName ?? faker.random.alpha({ count: 8 }),
    profileColor: user?.displayName ?? faker.datatype.hexaDecimal(6),
    username: user?.displayName ?? faker.datatype.string(8),
    profileImageUrl: user?.displayName,
  };
};
