import type { IToDo } from "../AddTodo/AddTodo";
import { TodoItem } from "../TodoItem/TodoItem";

type TProps = {
  tasks: IToDo[];
  dispach: React.Dispatch<React.SetStateAction<IToDo[]>>;
};

export function TodoList(props: TProps) {
  console.log("TodoList");

  function deletButton(deletIndex: number) {
    const newTasks = props.tasks.filter((item) => {
      if (item.createdAt === deletIndex) {
        return false;
      } else {
        return true;
      }
    });
    props.dispach(newTasks);
  }

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

  function handleEdit(index: number) {
    console.log(index);
    props.dispach((prev) =>
      prev.map((item) =>
        item.createdAt === index ? { ...item, isEdit: !item.isEdit } : item
      )
    );
  }
  function handleAccept(index: number) {
    props.dispach((prev) =>
      prev.map((item) => {
        if (index === item.createdAt) {
          return { ...item, value: item.draft };
        }
        return item;
      })
    );
  }
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
      })
    );
  }
  // }
  return (
    <div className="allTasks">
      {props.tasks.map((item) => {
        return (
          <TodoItem
            {...item}
            deletButton={deletButton}
            editValue={editValue}
            handleAccept={handleAccept}
            handleEdit={handleEdit}
            completeTasks={completeTasks}
          />
        );
      })}
    </div>
  );
}
