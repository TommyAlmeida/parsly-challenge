import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService],
})
export class UserModule {}
