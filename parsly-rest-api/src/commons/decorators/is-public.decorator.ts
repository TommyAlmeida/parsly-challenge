import { SetMetadata } from '@nestjs/common';

export const IsPublicDecoratorKey = 'isPublic';

export const IsPublic = () => SetMetadata(IsPublicDecoratorKey, true);
