import { TodoItem } from "../TodoItem/TodoItem";
import { useAppSelector } from "../../../hooks";
export function TodoList() {
  const todoList = useAppSelector((state) => state.todo.todoList);

  return (
    <div className="allTasks">
      {todoList.map((item) => (
        <TodoItem key={item.createdAt} {...item} />
      ))}
    </div>
  );
}
