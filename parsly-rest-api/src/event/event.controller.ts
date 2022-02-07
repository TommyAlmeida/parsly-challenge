import { EventService } from './event.service';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guards';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll() {
    return this.eventService.listEvents();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/generate')
  async generateLoremEvent() {
    return this.eventService.generateLoremEvent();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/object/:id')
  async findObjectById(@Param('id', ParseIntPipe) id: number) {
    return await this.eventService.findObjectById(id);
  }
}
