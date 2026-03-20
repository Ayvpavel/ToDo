import axios from "axios";
import type { promises } from "dns";
export interface User {
  email: string;
  age: number;
  password: string;
}
const API_URL_USER = "http://localhost:3001";

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface UserProfile {
  id: number;
  email: string;
  age?: number;
  createdAt: string;
}
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface ChangePasswordResponse {
  message: string;
}
export const registerUserApi = async (
  email: string,
  age: number,
  password: string,
) => {
  const response = await axios.post(`${API_URL_USER}/auth/register`, {
    email,
    age,
    password,
  });
  return response.data;
};

export async function loginApi({
  email,
  password,
}: LoginData): Promise<AuthTokens> {
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("Отправляемые данные:", { email, password, refreshToken });

  try {
    const response = await axios.post<AuthTokens>(
      `${API_URL_USER}/auth/login`,
      { email, password },  
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: refreshToken ? `Bearer ${refreshToken}` : "",
        },
      },
    );

    return response.data;  
  } catch (error: any) {
    console.error("Ошибка входа:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Ошибка входа");
  }
}

export async function fetchUserProfile(): Promise<UserProfile> {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get<UserProfile>(`${API_URL_USER}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Профиль получен:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Ошибка при получении профиля:",
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || "Ошибка получения профиля",
    );
  }
}

export async function changePasswordApi(
  data: ChangePasswordRequest,
): Promise<ChangePasswordResponse> {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.post<ChangePasswordResponse>(
    `${API_URL_USER}/auth/change-password`,
    data,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
}
