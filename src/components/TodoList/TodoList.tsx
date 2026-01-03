import {
  AssignmentAdd,
  Done,
  LabelImportantOutlineRounded,
} from "@mui/icons-material";
import type { IToDo } from "../AddTodo/AddTodo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import editIkon from "../../assets/edit_10015412.png"

type TProps = {
  tasks: IToDo[];
  dispach: React.Dispatch<React.SetStateAction<IToDo[]>>;
  // setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  // isCompleted: boolean;
};

export function TodoList(props: TProps) {
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
    props.dispach((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isEdit: !item.isEdit } : item
      )
    );
  }
  function handleAccept(index: number) {
    props.dispach((prev) =>
      prev.map((item, i) => {
        if (index === i) {
          return { ...item, value: item.draft };
        }
        return item;
      })
    );
  }
  function editValue(index: number, a: string) {
    props.dispach((prev) =>
      prev.map((item, i) => {
        if (i === index) {
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
                    handleAccept(index);
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
              <div className="postBtn" >
                 <div
                style={{ textDecoration: item.done ? "line-through" : undefined }}
                className="NewDiv"
              >
                {item.value}{" "}
                
              
              </div>
              <div className="btnEditDel">  <button
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
                  <img src={editIkon} width={10} height={10} alt="editIkon" />
                </button>
                <input
                  type="checkbox"
                  // checked={}
                  onClick={() => {
                    completeTasks(index);
                  }}
                /></div>
              </div>
             
            )}
          </div>
        );
      })}
    </div>
  );
}
