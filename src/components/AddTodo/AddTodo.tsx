import { useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import { useTheme } from "../../utils/useTheme";
import styled from "styled-components";
import { getTodosFromLocalStorage } from "../../utils/localStorage";
export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}
type TSort = "new" | "old";

function AddTodo() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState<IToDo[]>(() =>
    getTodosFromLocalStorage()
  );
  console.log(todoList);
  const [sortType, setSortType] = useState<TSort>("new");
  const { switchTheme, theme } = useTheme(); // Хук для тёмной/светлой темы
  const sortedTodos = [...todoList].sort((a, b) => {
    if (sortType === "new") {
      return b.createdAt - a.createdAt;
    }
    return a.createdAt - b.createdAt;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  function addtodo() {
    if (text.trim() === "") {
      return alert("Введите задачу");
    }
    setTodoList([
      ...todoList,
      {
        value: text,
        done: false,
        isEdit: false,
        draft: text,
        createdAt: Date.now(),
      },
    ]);
    setText("");
  }

  return (
    <div className="wrapper " id={theme}>
      <h1>To-Do List</h1>
      <div className="lightMode">
        {" "}
        <input className="checkMode" onChange={switchTheme} type="checkbox" />
        <p className="pMode">{theme} mode</p>
      </div>
      <div></div>

      <input
        className="value"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        type="text"
      />
      <button className="buttonAdd" onClick={addtodo}>
        Add
      </button>
      <div className="NEWOLD">
        <button className="btnNew" onClick={() => setSortType("new")}>
          New
        </button>
        <button className="btnOld" onClick={() => setSortType("old")}>
          Old
        </button>
      </div>

      <TodoList tasks={sortedTodos} dispach={setTodoList} />
    </div>
  );
}

export default AddTodo;
