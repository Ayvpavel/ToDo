import type { IToDo } from "../AddTodo/AddTodo";
import { TodoItem } from "../TodoItem/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "../../../store/todoSlice";

// function editTodo(index: number) {
//   const dispach = useDispatch(editTodo(id))
// }
type TProps = {
  tasks: IToDo[];
  dispach: React.Dispatch<React.SetStateAction<IToDo[]>>;
};

export function TodoList(props: TProps) {
  console.log("TodoList");
  // @ts-ignore
  const todoList = useSelector((state) => state.todo.todoList);
  console.log(todoList, "todoList");
  // function deletButton(deletIndex: number) {
  //   const newTasks = props.tasks.filter((item) => {
  //     if (item.createdAt === deletIndex) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   });
  //   props.dispach(newTasks);
  // }

  function completeTasks(index: number) {
    // переключает флаг done
    const newTasks = props.tasks.map((item) => {
      if (index === item.createdAt) {
        return { ...item, done: !item.done };
      } else {
        return item;
      }
    });
    props.dispach(newTasks);
  }

  // function handleAccept(index: number) {
  //   props.dispach((prev) =>
  //     prev.map((item) => {
  //       if (index === item.createdAt) {
  //         return { ...item, value: item.draft };
  //       }
  //       return item;
  //     }),
  //   );
  // }
  function editValue(index: number, a: string) {
    props.dispach((prev) =>
      prev.map((item) => {
        if (item.createdAt === index) {
          return {
            ...item,
            draft: a,
          };
        }
        return item;
      }),
    );
  }
  return (
    <div className="allTasks">
      {todoList.map((item: any) => {
        return (
          <TodoItem
            {...item}
            // deletButton={deletButton}
            editValue={editValue}
            // handleAccept={handleAccept}
            editTodo={editTodo}
            completeTasks={completeTasks}
          />
        );
      })}
    </div>
  );
}
