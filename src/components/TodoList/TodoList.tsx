import { TodoItem } from "../TodoItem/TodoItem";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { Container, Pagination, Stack } from "@mui/material";
import { fetchTodos, setLimit } from "../../../store/todoSlice";
import { useEffect } from "react";

export function TodoList() {
 
  const dispatch = useAppDispatch();
  const { allTodos, status, error, page, totalPages, limit } = useAppSelector(
    (state) => state.todo,
  );
 
  useEffect(() => {
    dispatch(fetchTodos({ page, limit: limit }));
  }, [page, dispatch, limit]);
  useEffect(() => {
    if (allTodos.length === 0) {
      dispatch(fetchTodos({ page, limit: limit }));
    }
  }, [allTodos.length]);
  useEffect(() => {
    localStorage.setItem("todoLimit", String(limit));
  }, [limit]);
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchTodos({ page: value, limit: limit }));
  };

  if (status === "loading") {
    return <p className="todo-text todo-text--loading">Загрузка...</p>;
  }

  if (status === "rejected") {
    return <p className="todo-text todo-text--error">Ошибка: {error}</p>;
  }

  if (status === "resolved" && allTodos.length === 0) {
  
  }

  return (
    <Container>
      <Stack spacing={2} alignItems="center">
        <div className="allTasks">
          {allTodos.map((item) => (
            <TodoItem key={item.id} {...item} />
          ))}
        </div>

        <div className="paginatDiv"
         
        >
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          )}
          <label
            htmlFor="tasks-limit"
            style={{ fontSize: "14px", color: "#1976d2" }}
          >
            Задач на странице:
          </label>
          <select
            className="select"
            value={limit}
            onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
          >
            <option value={1}>1 </option>

            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
      </Stack>
    </Container>
  );
}
