import axios from "axios";
export interface User {
  email: string;
  age: number;
  password: string;
}
// const API_URL_USER = "http://localhost:3001";
export const VITE_API_URL_USER = import.meta.env.VITE_API_URL_USER;

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
  const response = await axios.post(`${VITE_API_URL_USER}/auth/register`, {
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

  try {
    const response = await axios.post<AuthTokens>(
      `${VITE_API_URL_USER}/auth/login`,
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
    const response = await axios.get<UserProfile>(
      `${VITE_API_URL_USER}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

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
    `${VITE_API_URL_USER}/auth/change-password`,
    data,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
}
