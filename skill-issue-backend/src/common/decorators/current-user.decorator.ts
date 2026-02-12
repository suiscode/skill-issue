import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthUser } from '../types/auth-user.type';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser | undefined => {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext<{ req?: { user?: AuthUser } }>().req;
    return request?.user;
  },
);
