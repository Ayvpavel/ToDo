import axios from "axios";

export const API_URL = "http://localhost:3001";

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
}

export const getTodos = async (
  page: number,
  limit: number,
): Promise<TodosResponse> => {
  const response = await axios.get<TodosResponse>(`${API_URL}/todos`, {
    params: { page, limit },
  });

  return response.data;
};

export const createNewTodo = async (text: string): Promise<Todo> => {
  const { data } = await axios.post<Todo>(`${API_URL}/todos`, { text });
  return data;
};

export const deleteTodoFromServer = async (id: number): Promise<number> => {
  await axios.delete(`${API_URL}/todos/${id}`);
  return id;
};

export const updateTodoApi = async (
  id: number,
  text: string,
): Promise<Todo> => {
  const response = await axios.put<Todo>(`http://localhost:3001/todos/${id}`, {
    text,
  });

  return response.data;
};
