import axios from "axios";
// const API_URL = "http://localhost:3001";

// export const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "http://localhost:3001";
export const VITE_API_URL_USER = import.meta.env.VITE_API_URL_USER;
const api = axios.create({
  baseURL: VITE_API_URL_USER,
});

export type Filter = "all" | "active" | "completed";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface TodosResponse {
  data: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filter: string;
  // error:string
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axios.post(`${VITE_API_URL_USER}/auth/refresh`, { refreshToken });
      const newAccessToken = res.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      const { accessToken, refreshToken: newRefreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export const getTodos = async (
  page: number,
  limit: number,
  filter: string,
): Promise<TodosResponse> => {
  const response = await api.get<TodosResponse>("/todos", {
    params: { page, limit, filter },
  });

  return response.data;
};

export const createNewTodo = async (text: string): Promise<Todo> => {
  const { data } = await api.post<Todo>(`/todos`, { text }, {});
  return data;
};
export const deleteTodoFromServer = async (id: number): Promise<number> => {
  await api.delete(`/todos/${id}`, {});
  return id;
};

export const updateTodoApi = async (
  id: number,
  text: string,
): Promise<Todo> => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.put<Todo>(
    `${VITE_API_URL_USER}/todos/${id}`,
    { id, text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const setTodoCompletedApi = async (id: number): Promise<Todo> => {
  const response = await api.patch(`/todos/${id}/toggle`, {});
  return response.data;
};
