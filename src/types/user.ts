export interface CreateUserDto {
  name: string;
  jobProfile: string;
}

export interface User {
  id: string;
  name: string;
  jobProfile: string;
  created_at: string;
}

export interface UserListResponse {
  status: number;
  message: string;
  total: number;
  limit: number | null;
  offset: number | null;
  data: User[];
}

export interface UserListParams {
  limit?: number;
  offset?: number;
  order?: {
    [key: string]: "ASC" | "DESC";
  };
  search?: string;
}
