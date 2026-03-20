import axios from "axios";
const API_URL = "http://localhost:3001";

// export const API_URL = import.meta.env.VITE_API_URL;

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
export const getTodos = async (
  page: number,
  limit: number,
  filter: string,
): Promise<TodosResponse> => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Нет токена");

  const response = await axios.get<TodosResponse>(`${API_URL}/todos`, {
    params: { page, limit, filter },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const createNewTodo = async (text: string): Promise<Todo> => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Нет токена");

  // try {
  const { data } = await axios.post<Todo>(
    `${API_URL}/todos`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
  // } catch (error: any) {
  //   console.error(
  //     "Ошибка создания задачи:",
  //     error.response?.data || error.message,
  //   );
  //   throw error;
  // }
};
export const deleteTodoFromServer = async (id: number): Promise<number> => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Нет токена");

  await axios.delete(`${API_URL}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
};

export const updateTodoApi = async (
  id: number,
  text: string,
): Promise<Todo> => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.put<Todo>(
    `${API_URL}/todos/${id}`,
    {id, text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const setTodoCompletedApi = async (id: number): Promise<Todo> => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
