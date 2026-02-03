import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
  },
  reducers: {
    addTodo(state, action) {
      console.log(action);

      state.todoList.push({
        value: action.payload,
        done: false,
        isEdit: false,
        draft: action.payload,
        createdAt: Date.now(),
      });
    },
    editTodo(state, action) {
      const id = action.payload;
      state.todoList = state.todoList.map((item) =>
        item.createdAt === id ? { ...item, isEdit: !item.isEdit } : item,
      );
    },
    handleAccept(state, action) {
      const id = action.payload;
      state.todoList = state.todoList.map((item) =>
        item.createdAt === id
          ? { ...item, value: item.draft, isEdit: false }
          : item,
      );
    },
    deletButton(state, action) {
      const id = action.payload;
      state.todoList = state.todoList.filter((item) => item.createdAt !== id);
    },
  },
});

export const { addTodo, editTodo, handleAccept, deletButton } =
  todoSlice.actions;
export default todoSlice.reducer;
