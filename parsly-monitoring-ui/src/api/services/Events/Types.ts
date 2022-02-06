export const EventSeverity = {
  Critical: "Critical",
  Error: "Error",
  Warning: "Warning",
};

export const EventObjectType = {
  ApiGateway: "ApiGateway",
  SupplierManagement: "SupplierManagement",
  UserManagement: "UserManagement",
  ESign: "ESign",
  StorageManagement: "StorageManagement",
  StorageClient: "StorageClient",
  Notifier: "Notifier",
};

export type IEventObject = {
  name: string;
  type: keyof typeof EventObjectType;
};

export interface IEventData {
  name: string;
  detail: string;
  timestamp: Date;
  eventObjectId: number;
  severity: keyof typeof EventSeverity;
}
