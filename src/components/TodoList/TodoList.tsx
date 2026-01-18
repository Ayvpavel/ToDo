import type { IToDo } from "../AddTodo/AddTodo";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import editIkon from "../../assets/edit.svg";
import { TodoItem } from "../TodoItem/TodoItem";

// import {
//   AssignmentAdd,
//   Done,
//   LabelImportantOutlineRounded,
// } from "@mui/icons-material";
// import { useEffect, useState } from "react";
type TProps = {
  tasks: IToDo[];
  dispach: React.Dispatch<React.SetStateAction<IToDo[]>>;
  // setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  // isCompleted: boolean;
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
    const newTasks = props.tasks.map((item, i) => {
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
    <div>
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
