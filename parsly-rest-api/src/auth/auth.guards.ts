import { AuthGuard } from '@nestjs/passport';
import { Injectable, Type, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IsPublicDecoratorKey } from 'src/commons/decorators/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(
    user: any,
    info: Error,
    context: { getHandler: () => Function | Type<any> },
  ) {
    if (user) {
      return user;
    }

    const isPublic = this.reflector.get<boolean>(
      IsPublicDecoratorKey,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
