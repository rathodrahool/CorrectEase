import api from "./api";
import axios from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignUpPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.access_token);
    }
    return response.data;
  },

  async signup(data: SignUpData) {
    const response = await api.post(`/auth/signup`, data);
    return response.data;
  },

  async verifyOTP(email: string, otp: string) {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  async resetPassword(token: string, password: string) {
    const response = await api.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
  },
};
