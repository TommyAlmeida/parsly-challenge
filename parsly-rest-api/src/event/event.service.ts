import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { Event, EventSeverity, EventObjectType } from '@prisma/client';
import * as faker from '@faker-js/faker';

const randomProperty = function (prop) {
  var keys = Object.keys(prop);
  return prop[keys[(keys.length * Math.random()) << 0]];
};

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(event: Event) {
    return await this.prisma.event.create({ data: event });
  }

  async listEvents() {
    return await this.prisma.event.findMany();
  }

  async generateLoremEvent() {
    const randomSeverity = randomProperty(EventSeverity);
    const randomObjectType = randomProperty(EventObjectType);
    const randomEventName = faker.default.lorem.slug(1);

    return await this.prisma.event.create({
      data: {
        timestamp: faker.default.date.past(Math.abs(Math.random() * 31)),
        detail: faker.default.lorem.paragraph(1),
        name: randomEventName,
        severity: randomSeverity,
        eventObject: {
          create: { name: randomEventName, type: randomObjectType },
        },
      },
    });
  }

  async findObjectById(id: number) {
    return await this.prisma.eventObject.findUnique({
      where: { id: id },
    });
  }
}
