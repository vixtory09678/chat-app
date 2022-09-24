import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserType = {
  userId: string;
};

export const UserApp = createParamDecorator<UserType>(
  (data: unknown, ctx: ExecutionContext): UserType => {
    const request = ctx.switchToHttp().getRequest();
    return { userId: request.session.userId };
  },
);
