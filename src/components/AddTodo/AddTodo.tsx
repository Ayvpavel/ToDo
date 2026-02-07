import { TodoList } from "../TodoList/TodoList";
import { useTheme } from "../../utils/useTheme";
import { FilterButton } from "../FilterButtons.styled/FilterButtons.styled";
import { useTodoState } from "../TodoContainer/TodoContainer";
import { useAppDispatch} from "../../../hooks";

import { addTodo, filteredTodos, setSortType } from "../../../store/todoSlice";

export interface IToDo {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
}
function AddTodo() {
  const dispatch = useAppDispatch();
  const {
    text,
    setText,

    filter,
  } = useTodoState();

  const { switchTheme, theme } = useTheme(); 

  function addtodo() {
    if (text.trim() === "") {
      return alert("Введите задачу");
    }
    dispatch(addTodo(text));
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
            onClick={() => dispatch(filteredTodos("all"))}
          >
            Все
          </FilterButton>
          <FilterButton
            className="done"
            $active={filter === "done"}
            onClick={() => dispatch(filteredTodos("done"))}
          >
            Готовые
          </FilterButton>
          <FilterButton
            className="notDone"
            $active={filter === "notDone"}
            onClick={() => dispatch(filteredTodos("notDone"))}
          >
            Неготовые
          </FilterButton>
        </div>{" "}
      </div>
      <TodoList />
    </div>
  );
}
export default AddTodo;
