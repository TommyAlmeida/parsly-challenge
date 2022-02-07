import { AuthInputData } from "./Types";
import { navigate } from "gatsby";
import http from "../../HttpCommon";

export const login = async (data: AuthInputData) => {
  return await http.post<AuthInputData>("/auth/login", data);
};

export const register = async (data: AuthInputData) => {
  return await http.post<AuthInputData>("/auth/register", data);
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
  navigate("/login");
};
