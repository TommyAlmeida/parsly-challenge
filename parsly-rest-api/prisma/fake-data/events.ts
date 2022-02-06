import { Prisma, Event, EventSeverity, EventObjectType } from '@prisma/client';
import * as faker from '@faker-js/faker';

export const randomEvents: Array<Prisma.EventCreateInput> = [
  {
    timestamp: faker.default.date.past(1),
    detail:
      'Failed to export to Stackdriver: rpc error: code = DeadlineExceeded desc = context deadline exceeded',
    name: 'GKE Container',
    severity: EventSeverity.Critical,
    eventObject: {
      create: { name: 'GKE Container', type: EventObjectType.ApiGateway },
    },
  },
  {
    timestamp: faker.default.date.past(2),
    detail:
      '{"statusCode":400,"message":"Validation failed (numeric string is expected)","error":"Bad Request"}',
    name: 'Kong',
    severity: EventSeverity.Error,
    eventObject: {
      create: { name: 'Kong', type: EventObjectType.ApiGateway },
    },
  },
  {
    timestamp: faker.default.date.soon(12),
    detail: 'Nest cant resolve dependencies of the MailService',
    name: 'Kong',
    severity: EventSeverity.Error,
    eventObject: {
      create: { name: 'Kong', type: EventObjectType.ApiGateway },
    },
  },
  {
    timestamp: faker.default.date.soon(20),
    detail: 'Unable to get users signature',
    name: 'eSign',
    severity: EventSeverity.Error,
    eventObject: {
      create: { name: 'eSign', type: EventObjectType.Esign },
    },
  },
  {
    timestamp: faker.default.date.soon(17),
    detail: 'AWS Budget exceeded',
    name: 'AWS Budgets',
    severity: EventSeverity.Warning,
    eventObject: {
      create: { name: 'Notifier', type: EventObjectType.Notifier },
    },
  },
  {
    timestamp: faker.default.date.soon(1),
    detail:
      'Warning:   2:34  warning "SupplierIdentity" is defined but never used  @typescript-eslint/no-unused-vars',
    name: 'Run npm run lint',
    severity: EventSeverity.Warning,
    eventObject: {
      create: {
        name: 'Supplier Management CI',
        type: EventObjectType.SupplierManagement,
      },
    },
  },
  {
    timestamp: faker.default.date.soon(13),
    detail:
      'Warning:   11:27  warning "PrismaSupplierCreateInput" is defined but never used  @typescript-eslint/no-unused-vars',
    name: 'Run npm run lint',
    severity: EventSeverity.Warning,
    eventObject: {
      create: {
        name: 'Supplier Management CI',
        type: EventObjectType.SupplierManagement,
      },
    },
  },

  {
    timestamp: faker.default.date.recent(24),
    detail: 'Error while exporting to s3 logs to cloudwatch',
    name: 'AWS Cloudwatch',
    severity: EventSeverity.Critical,
    eventObject: {
      create: {
        name: 'AWS S3',
        type: EventObjectType.StorageClient,
      },
    },
  },
];
