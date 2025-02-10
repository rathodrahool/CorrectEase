export interface User {
  id: string;
  name: string;
  jobProfile: string;
  created_at: string;
}

export interface UserListResponse {
  message: string;
  total: number;
  data: User[];
}
