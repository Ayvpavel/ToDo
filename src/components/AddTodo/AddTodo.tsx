import { useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import { useTheme } from "../../utils/useTheme";
import { getTodosFromLocalStorage } from "../../utils/localStorage";
import { FilterButton } from "../FilterButtons.styled/FilterButtons.styled";
export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}

type TSort = "new" | "old";
type TFilter = "all" | "done" | "notDone";

function AddTodo() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState<IToDo[]>(() =>
    getTodosFromLocalStorage()
  );
  const [filter, setFilter] = useState<TFilter>("all");
  const filteredTodos = todoList.filter((todoList) => {
    if (filter === "done") return todoList.done;
    if (filter === "notDone") return !todoList.done;
    return true;
  });
  const [sortType, setSortType] = useState<TSort>("new");
  const { switchTheme, theme } = useTheme(); // Хук для тёмной/светлой темы
  const sortedTodos = [...filteredTodos].sort((a, b) => {
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
      <div className="filterTasks">
        <FilterButton
          $active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          Все
        </FilterButton>
        <FilterButton
          $active={filter === "done"}
          onClick={() => setFilter("done")}
        >
          Готовые
        </FilterButton>
        <FilterButton
          $active={filter === "notDone"}
          onClick={() => setFilter("notDone")}
        >
          Неготовые
        </FilterButton>
      </div>
      <TodoList tasks={sortedTodos} dispach={setTodoList} />
    </div>
  );
}

export default AddTodo;
