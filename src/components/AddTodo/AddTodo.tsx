import { useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import { useTheme } from "../../utils/useTheme";
import { FilterButton } from "../FilterButtons.styled/FilterButtons.styled";
import { useMemo } from "react";
import { useTodoState } from "../TodoContainer/TodoContainer";
import { useDispatch, useStore } from "react-redux";
import { addTodo } from "../../../store/todoSlice";

export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}

function AddTodo() {
  const {
    text,
    setText,
    todoList,
    setTodoList,
    filter,
    setFilter,
    sortType,
    setSortType,
  } = useTodoState();
  const store = useStore();
  console.log(store.getState());

  const dispach = useDispatch();
  const filteredTodos = useMemo(
    () =>
      todoList.filter((todo) =>
        filter === "done"
          ? todo.done
          : filter === "notDone"
            ? !todo.done
            : true,
      ),
    [todoList, filter],
  );
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
    dispach(addTodo(text));
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
      <div className="inputAdd">
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
      </div>
      <div className="task-controls">
        <div className="btnNewOld">
          <button className="btnNew" onClick={() => setSortType("new")}>
            New
          </button>

          <button className="btnOld" onClick={() => setSortType("old")}>
            Old
          </button>
        </div>
        <div className="filterTasks">
          <FilterButton
            className="all"
            $active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Все
          </FilterButton>
          <FilterButton
            className="done"
            $active={filter === "done"}
            onClick={() => setFilter("done")}
          >
            Готовые
          </FilterButton>
          <FilterButton
            className="notDone"
            $active={filter === "notDone"}
            onClick={() => setFilter("notDone")}
          >
            Неготовые
          </FilterButton>
        </div>{" "}
      </div>
      <TodoList tasks={sortedTodos} dispach={setTodoList} />
    </div>
  );
}

export default AddTodo;
