import { useState } from "react";
import { useTheme } from "../../utils/useTheme";
// import { useAppDispatch } from "../../../hooks";

export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}
type TFilter = "all" | "done" | "notDone";

export function useTodoState() {
  // const dispatch = useAppDispatch();

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
