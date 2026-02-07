import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}

type TodosState = {
  allTodos: Todo[];
  todoList: Todo[];
  filter: "all" | "done" | "notDone";
  sortType: "new" | "old";
};
const initialState: TodosState = {
  allTodos: [],
  todoList: [],
  filter: "all",
  sortType: "new",
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        value: action.payload,
        done: false,
        isEdit: false,
        draft: action.payload,
        createdAt: Date.now(),
      };
      state.allTodos.push(newTodo);
      state.todoList = applyFilterAndSort(state);
    },

    editTodo(state, action) {
      const id = action.payload;
      state.allTodos = state.allTodos.map((item) =>
        item.createdAt === id ? { ...item, isEdit: !item.isEdit } : item,
      );
      state.todoList = applyFilterAndSort(state);
    },

    handleAccept(state, action) {
      const id = action.payload;
      state.allTodos = state.allTodos.map((item) =>
        item.createdAt === id
          ? { ...item, value: item.draft, isEdit: false }
          : item,
      );
      state.todoList = applyFilterAndSort(state);
    },

    deletButton(state, action) {
      const id = action.payload;
      state.allTodos = state.allTodos.filter((item) => item.createdAt !== id);
      state.todoList = applyFilterAndSort(state);
    },

    editValue(state, action) {
      const { id, value } = action.payload;
      state.allTodos = state.allTodos.map((item) =>
        item.createdAt === id ? { ...item, draft: value } : item,
      );
      state.todoList = applyFilterAndSort(state);
    },

    completeTasks(state, action) {
      const id = action.payload;
      state.allTodos = state.allTodos.map((item) =>
        item.createdAt === id ? { ...item, done: !item.done } : item,
      );
      state.todoList = applyFilterAndSort(state);
    },

    setSortType(state, action: PayloadAction<"new" | "old">) {
      state.sortType = action.payload;
      state.todoList = applyFilterAndSort(state);
    },

    filteredTodos(state, action) {
      state.filter = action.payload;
      state.todoList = applyFilterAndSort(state);
    },
  },
});

function applyFilterAndSort(state: TodosState): Todo[] {
  console.log(applyFilterAndSort, "applyFilterAndSort");
  let filtered = state.allTodos;

  if (state.filter === "done") {
    filtered = filtered.filter((todo) => todo.done);
  } else if (state.filter === "notDone") {
    filtered = filtered.filter((todo) => !todo.done);
  }

  if (state.sortType === "new") {
    filtered = [...filtered].sort((a, b) => b.createdAt - a.createdAt);
  } else {
    filtered = [...filtered].sort((a, b) => a.createdAt - b.createdAt);
  }

  return filtered;
}

export const {
  addTodo,
  editTodo,
  handleAccept,
  deletButton,
  editValue,
  setSortType,
  completeTasks,
  filteredTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
