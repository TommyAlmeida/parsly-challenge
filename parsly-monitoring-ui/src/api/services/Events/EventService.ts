import http from "../../HttpCommon";
import { IEventData, IEventObject } from "./Types";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

export const listEvents = async () => {
  return await http.get<IEventData[]>("/events/", { headers: headers });
};

export const generateRandomEvent = async () => {
  return await http.post("/events/generate", { headers: headers });
};

export const deleteEventById = async (id: number) => {
  return await http.delete(`/events/${id}`, {
    headers: headers,
  });
};

export const findObjectById = async (id: number) => {
  return await http.get<IEventObject>(`/events/object/${id}`, {
    headers: headers,
  });
};
