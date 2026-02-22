import { useState } from "react";
import { useTheme } from "../../utils/useTheme";

export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}
type TFilter = "all" | "completed" | "active";
type TSort = "new" | "old";
const saveSort = localStorage.getItem("sort") as "new" | "old";
const savedFilter = localStorage.getItem("filter") as
  | "all"
  | "completed"
  | "active"
  | null;
export function useTodoState() {
  const [text, setText] = useState("");

  const [filter, setFilter] = useState<TFilter>(savedFilter ?? "all");
  const [sort, setSort] = useState<TSort>(saveSort ?? "new");

  const { theme } = useTheme();
  return {
    text,
    setText,
    filter,
    setFilter,
    theme,
    sort,
    setSort,
  };
}
