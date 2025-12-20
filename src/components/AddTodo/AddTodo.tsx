import { useState } from "react";
import { TodoList } from "../TodoList/TodoList";
interface IToDo {
  value: string;
  done: boolean;
}
function AddTodo() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState<IToDo[]>([]);
  function addtodo() {
    setTodoList(todoList.concat([{ value: text, done: false }]));
  }

  return (
    <div>
      <input
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        type="text"
      />
      <button onClick={addtodo}>Добавить</button>
      <TodoList todos={todoList} />
    </div>
  );
}

export default AddTodo;
