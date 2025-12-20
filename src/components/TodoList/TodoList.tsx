import { useState } from "react";
interface IToDo {
  value: string;
  done: boolean;
}
type TProps = {
  todos: IToDo[];
};

export function TodoList(props: TProps) {
  console.log(props, "props");

  return (
    <div>
      {props.todos.map((item) => (
        <div style={{ color: "white" }}>{item.value}</div> 
      ))}
    </div>
  );
}
