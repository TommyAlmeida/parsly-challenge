import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule {}
