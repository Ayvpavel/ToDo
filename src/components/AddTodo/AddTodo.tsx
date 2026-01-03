import { useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import { useTheme } from "../../utils/useTheme";

export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
}

function AddTodo() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState<IToDo[]>([]);
  const { switchTheme, theme} = useTheme();

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
    <div className="wrapper " id={theme} >
      <h1>To-Do List</h1>
      <p>{theme} mode</p>
      <input onChange={switchTheme} type="checkbox" id="" />

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

      <TodoList tasks={todoList} dispach={setTodoList} />
    </div>
  );
}

export default AddTodo;
