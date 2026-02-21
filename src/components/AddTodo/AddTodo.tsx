import { TodoList } from "../TodoList/TodoList";
import { useTheme } from "../../utils/useTheme";
import { FilterButton } from "../FilterButtons.styled/FilterButtons.styled";
import { useTodoState } from "../TodoContainer/TodoContainer";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import { createTodo, fetchTodos, setSortType } from "../../../store/todoSlice";

export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}

function AddTodo() {
  const { page, limit } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const { text, setText, filter, setFilter } = useTodoState();

  const { switchTheme, theme } = useTheme();

  function addtodo() {
    if (text.trim() === "") {
      return alert("Введите задачу");
    }
    dispatch(createTodo(text)).then(() => {
      dispatch(fetchTodos({ page, limit: limit, filter }));
    });
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
          <button
            className="btnNew"
            onClick={() => dispatch(setSortType("new"))}
          >
            New
          </button>

          <button
            className="btnOld"
            onClick={() => dispatch(setSortType("old"))}
          >
            Old
          </button>
        </div>
        <div className="filterTasks">
          <FilterButton
            className="all"
            $active={filter === "all"}
            onClick={() => {
              setFilter("all");
              localStorage.setItem("filter", "all");
              dispatch(fetchTodos({ page, limit: limit, filter: "all" }));
            }}
          >
            All
          </FilterButton>
          <FilterButton
            className="completed"
            $active={filter === "completed"}
            onClick={() => {
              setFilter("completed");
              localStorage.setItem("filter", "completed");
              dispatch(fetchTodos({ page, limit: limit, filter: "completed" }));
            }}
          >
            Completed
          </FilterButton>
          <FilterButton
            className="active"
            $active={filter === "active"}
            onClick={() => {
              setFilter("active");
              localStorage.setItem("filter", "active");
              dispatch(fetchTodos({ page, limit: limit, filter: "active" }));
            }}
          >
            Active
          </FilterButton>
        </div>
      </div>

      <TodoList />
    </div>
  );
}
export default AddTodo;
