import api from "./api";
import {
  CreateUserDto,
  User,
  UserListResponse,
  UserListParams,
} from "../types/user";

export const userService = {
  createUser: async (data: CreateUserDto): Promise<User> => {
    const response = await api.post<User>("/user", data);
    return response.data;
  },

  getUsers: async (params: UserListParams = {}): Promise<UserListResponse> => {
    const response = await api.get<UserListResponse>("/user", { params });
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/user/${userId}`);
  },

  updateUser: async (
    userId: string,
    data: Partial<CreateUserDto>
  ): Promise<User> => {
    const response = await api.patch<User>(`/user/${userId}`, data);
    return response.data;
  },
};

export type { User, CreateUserDto, UserListResponse, UserListParams };
