import http from "../../HttpCommon";
import { IEventData, IEventObject } from "./Types";

export const listEvents = async () => {
  return await http.get<IEventData[]>("/events/");
};

export const generateRandomEvent = async () => {
  return await http.post("/events/generate");
};

export const findObjectById = async (id: number) => {
  return await http.get<IEventObject>(`/events/object/${id}`);
};
