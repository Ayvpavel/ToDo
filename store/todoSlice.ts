import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createNewTodo,
  deleteTodoFromServer,
  getTodos,
  setTodoCompletedApi,
  updateTodoApi,
} from "../src/api/todos";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async ({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: string;
  }) => {
    const response = await getTodos(page, limit, filter);
    return response;
  },
);
export const createTodo = createAsyncThunk<Todo, string>(
  "todo/creatTodo",
  async (text: string) => {
    const todo = await createNewTodo(text);
    return todo;
  },
);

export const deleteTodo = createAsyncThunk<number, number>(
  "todo/deleteTodo",
  async (id: number) => {
    const deletedId = await deleteTodoFromServer(id);
    return deletedId;
  },
);
export const updateTodo = createAsyncThunk<Todo, { id: number; text: string }>(
  "todos/updateTodo",
  async ({ id, text }) => {
    const updatedTodo = await updateTodoApi(id, text);
    return updatedTodo;
  },
);

export const setTodoCompleted = createAsyncThunk<Todo, { id: number }>(
  "todos/setCompleted",
  async ({ id }) => {
    const updatedTodo = await setTodoCompletedApi(id);
    return updatedTodo;
  },
);
export interface Todo {
  text: string;
  done?: boolean;
  isEdit?: boolean;
  draft?: string;
  createdAt: number;
  id: number;
  completed: boolean;
}

type TodosState = {
  allTodos: Todo[];
  todoList: Todo[];
  filter: string;
  sortType: "new" | "old";
  status: "idle" | "loading" | "resolved" | "rejected";
  error: string | null;
  totalPages: number;
  page: number;
  total: number;
  limit: number;
  done: boolean;
};
const savedTodos = localStorage.getItem("todos");
const savedLimit = localStorage.getItem("todoLimit");
const saveFilter = localStorage.getItem("filter");
export const initialState: TodosState = {
  allTodos: savedTodos ? JSON.parse(savedTodos) : [],
  todoList: [],
  filter: saveFilter ? saveFilter : "all",
  sortType: "new",
  status: "idle",
  error: null,
  page: 1,
  totalPages: 1,
  total: 0,
  done: false,

  limit: savedLimit ? Number(localStorage.getItem("todoLimit")) : 5,
};
const todoSlice = createSlice({
  name: "todo",
  initialState,

  reducers: {
    editTodo(state, action) {
      const id = action.payload;
      state.allTodos = state.allTodos.map((item) =>
        item.createdAt === id
          ? { ...item, isEdit: !item.isEdit, draft: item.text }
          : item,
      );
    },

    handleAccept(state, action) {
      const id = action.payload;
      state.allTodos = state.allTodos.map((item) =>
        item.createdAt === id
          ? { ...item, value: item.draft, isEdit: false }
          : item,
      );
    },

    deletButton(state, action) {
      const id = action.payload;
      state.allTodos = state.allTodos.filter((item) => item.createdAt !== id);
    },

    editValue(state, action) {
      const { id, value } = action.payload;
      state.allTodos = state.allTodos.map((item) =>
        item.createdAt === id ? { ...item, draft: value } : item,
      );
    },

    setSortType(state, action: PayloadAction<"new" | "old">) {
      state.sortType = action.payload;
    },

    filteredTodos(state, action) {
      state.filter = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "resolved";
        state.allTodos = action.payload.data; // текущая страница todos

        state.totalPages = action.payload.totalPages; // всего страниц
        state.total = action.payload.total; // всего todos
        state.page = action.payload.page; // текущая страница
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "Unknown error";
      })

      .addCase(createTodo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // .addCase(createTodo.fulfilled, (state, action) => {
      //   state.status = "resolved";
      //   state.allTodos.push(action.payload);
      //   state.todoList = applyFilterAndSort(state);
      // })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.allTodos = state.allTodos.filter(
          (todo) => todo.id !== action.payload,
        );
      })
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "resolved";
        state.allTodos = state.allTodos.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(updateTodo.rejected, (state) => {
        state.status = "rejected";
        state.error = "Ошибка обновления";
      })
      .addCase(setTodoCompleted.fulfilled, (state, action) => {
        const index = state.allTodos.findIndex(
          (t) => t.id === action.payload.id,
        );
        if (index !== -1) state.allTodos[index] = action.payload;
        state.todoList = [...state.allTodos];
      });
  },
});

// function applyFilterAndSort(state: TodosState): Todo[] {
//   let filtered = state.allTodos;

//   if (state.filter === "done") {
//     filtered = filtered.filter((todo) => todo.done);
//   } else if (state.filter === "notDone") {
//     filtered = filtered.filter((todo) => !todo.done);
//   }

//   if (state.sortType === "new") {
//     filtered = [...filtered].sort((a, b) => +b.createdAt - +a.createdAt);
//   } else {
//     filtered = [...filtered].sort((a, b) => +a.createdAt - +b.createdAt);
//   }

//   return filtered;
// }

export const {
  editTodo,
  handleAccept,
  deletButton,
  editValue,
  setSortType,
  filteredTodos,
  setPage,
  setLimit,
} = todoSlice.actions;

export default todoSlice.reducer;
