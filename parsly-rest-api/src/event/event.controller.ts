import { EventService } from './event.service';
import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/')
  async findAll() {
    return this.eventService.listEvents();
  }

  @Post('/generate')
  async generateLoremEvent() {
    return this.eventService.generateLoremEvent();
  }

  @Get('/object/:id')
  async findObjectById(@Param('id', ParseIntPipe) id: number) {
    return await this.eventService.findObjectById(id);
  }
}
