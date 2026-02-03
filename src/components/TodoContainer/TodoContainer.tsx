import { useState } from "react";
import { getTodosFromLocalStorage } from "../../utils/localStorage";
import { useTheme } from "../../utils/useTheme";
export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}
type TFilter = "all" | "done" | "notDone";
type TSort = "new" | "old";

export function useTodoState() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState<IToDo[]>(() =>
    getTodosFromLocalStorage(),
  );
  const [filter, setFilter] = useState<TFilter>("all");
  const [sortType, setSortType] = useState<TSort>("new");
  const { switchTheme, theme } = useTheme(); // Хук для тёмной/светлой темы

  return {
    text,
    setText,
    todoList,
    setTodoList,
    filter,
    setFilter,
    sortType,
    setSortType,
    switchTheme,
    theme,
  };
}
