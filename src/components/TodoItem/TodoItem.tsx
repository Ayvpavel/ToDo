import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import editIkon from "../../assets/edit.svg";
import saveAdd from "../../assets/saveAdd.png";
import noteAdd from "../../assets/noteAdd.png";
import { useDispatch, useSelector } from "react-redux";
import { deletButton, editTodo, handleAccept } from "../../../store/todoSlice";

export interface TodoItemProps {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
  editValue: (index: number, a: string) => void;
  handleAccept: (index: number) => void;
  editTodo: (index: number) => void;
  deletButton: (deletIndex: number) => void;
  completeTasks: (deletIndex: number) => void;
}
export function TodoItem(props: TodoItemProps) {
  const dispach = useDispatch();
  // @ts-ignore

  const todoList = useSelector((state) => state.todo.todoList);

  return (
    <div key={props.createdAt} className="post">
      {" "}
      {props.isEdit ? (
        <div className="oneTask">
          <input
            onChange={(event) => {
              let value = event.target.value;
              props.editValue(props.createdAt, value);
            }}
            type="text"
            value={props.draft}
            className="valueAdd"
          />
          <div className="saveDel">
            <button
              className="btnSaveTasks"
              onClick={() => {
                dispach(handleAccept(props.createdAt));
              }}
            >
              <img
                className="saveAdd"
                height={30}
                width={30}
                src={saveAdd}
                alt="saveAdd"
              />
            </button>
            <button
              className="btnNote"
              onClick={() => {
                props.editTodo(props.createdAt);
              }}
            >
              <img
                className="noteAdd"
                height={30}
                width={30}
                src={noteAdd}
                alt="noteAdd"
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="postBtn">
          <div
            style={{
              textDecoration: props.done ? "line-through" : undefined,
            }}
            className="NewDiv"
          >
            {props.value}
            {"  "}
          </div>
          <div className="btnEditDel">
            {" "}
            <button
              className="DelletButton"
              onClick={() => {
                dispach(deletButton(props.createdAt));
              }}
            >
              <DeleteForeverIcon />{" "}
            </button>
            <button
              className="btnEdit"
              onClick={() => {
                // props.editTodo(props.createdAt);
                dispach(editTodo(props.createdAt));
              }}
            >
              <img
                className="imgEdit"
                src={editIkon}
                width={15}
                height={18}
                alt="editIkon"
              />
            </button>
            <input
              checked={props.done}
              className="inputActive"
              type="checkbox"
              onClick={() => {
                props.completeTasks(props.createdAt);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
