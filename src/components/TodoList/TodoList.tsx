import { AssignmentAdd, Done } from "@mui/icons-material";
import type { IToDo } from "../AddTodo/AddTodo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";

type TProps = {
  tasks: IToDo[];
  dispach: React.Dispatch<React.SetStateAction<IToDo[]>>;
  // setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  // isCompleted: boolean;
};

export function TodoList(props: TProps) {
  const [newTodo, setNewTodo] = useState();
  console.log(props.tasks);
  function deletButton(deletIndex: number) {
    const newTasks = props.tasks.filter((item, index) => {
      if (index === deletIndex) {
        return false;
      } else {
        return true;
      }
    });
    props.dispach(newTasks);
  }

  function completeTasks(index: number) {
    const newTasks = props.tasks.map((item, i) => {
      if (index === i) {
        return { ...item, done: !item.done };
      } else {
        return item;
      }
    });
    props.dispach(newTasks);
  }

  function handleEdit(index: number) {
    const newTasks = props.tasks.map((item, i) => {
      if (index === i) {
        return { ...item, isEdit: !item.isEdit };
      } else {
        return item;
      }
    });
    props.dispach(newTasks);
  }
  function handleAccept(index: number) {
    const newValue = props.tasks.map((item, i) => {
      if (index === i) {
        return { ...item, value: item.draft };
      } else {
        return item;
      }
    });
    props.dispach(newValue);
  }
  function editValue(index: number, a: string) {
    const newValue = props.tasks.map((item, i) => {
      if (index === i) {
        return { ...item, draft: a };
      } else {
        return item;
      }
    });
    props.dispach(newValue);
  }
  // }
  return (
    <div>
      {props.tasks.map((item, index) => {
        return (
          <div className="post">
            {item.isEdit ? (
              <div>
                <input
                  onChange={(event) => {
                    let value = event.target.value;
                    editValue(index, value);
                  }}
                  type="text"
                  value={item.draft}
                />
                <button
                  onClick={() => {
                    handleAccept(index)
                    handleEdit(index);
                  }}
                >
                  ^
                </button>
                <button
                  onClick={() => {
                    handleEdit(index);
                  }}
                >
                  X
                </button>
              </div>
            ) : (
              <div
                style={{ textDecoration: item.done ? "underline" : undefined }}
                className="NewDiv"
              >
                {item.value}{" "}
                <button
                  className="DelletButton"
                  onClick={() => {
                    deletButton(index);
                  }}
                >
                  <DeleteForeverIcon />{" "}
                </button>
                <button
                  onClick={() => {
                    handleEdit(index);
                  }}
                >
                  Edit
                </button>
                <input
                  type="checkbox"
                  // checked={}
                  onClick={() => {
                    completeTasks(index);
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
