import { useState } from "react";
import { useTheme } from "../../utils/useTheme";

export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}
type TFilter = "all" | "done" | "notDone";

export function useTodoState() {

  const [text, setText] = useState("");

  const [filter, setFilter] = useState<TFilter>("all");
  const { theme } = useTheme();

  return {

    
    text,
    setText,
    filter,
    setFilter,
    theme,
  };
}
