import api from "./api";
import { UserListResponse } from "../types/user";

export const userService = {
  getUsers: async (): Promise<UserListResponse> => {
    const response = await api.get<UserListResponse>("/users");
    return response.data;
  },
};
