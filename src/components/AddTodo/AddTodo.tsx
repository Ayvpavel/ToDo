import { useState } from "react";
import { TodoList } from "../TodoList/TodoList";

export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
}

function AddTodo() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState<IToDo[]>([]);
  function addtodo() {
    if (text.trim() === "") {
      return alert("Пожалуйста, введите задачу");
    }
    setTodoList([
      ...todoList,
      { value: text, done: false, isEdit: false, draft: text },
    ]);
    setText("");
  }

  return (
    <div>
      <input
        className="value"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        type="text"
      />
      <button className="butto  nAdd" onClick={addtodo}>
        +
      </button>

      <TodoList tasks={todoList} dispach={setTodoList} />
    </div>
  );
}

export default AddTodo;
