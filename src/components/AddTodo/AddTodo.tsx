import { useState } from "react";
import { TodoList } from "../TodoList/TodoList";

export interface IToDo {
  value: string;
  done: boolean;
}

function AddTodo() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState<IToDo[]>([]);
  function addtodo() {
    if (text.trim() === "") {
      return alert("Пожалуйста, введите задачу");
    }
    setTodoList([...todoList, { value: text, done: false }]);
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
      <button className="buttonAdd" onClick={addtodo}>
        +
      </button>

      <TodoList tasks={todoList}  dispach={setTodoList}   />
      
      {/* тут tasks это ключ */}
    </div>
  );
}

export default AddTodo;
