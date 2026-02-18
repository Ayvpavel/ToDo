import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import editIkon from "../../assets/edit.svg";
import saveAdd from "../../assets/saveAdd.png";
import noteAdd from "../../assets/noteAdd.png";
import { useAppDispatch } from "../../../hooks";
import {
  completeTasks,
  deleteTodo,
  editTodo,
  editValue,
  updateTodo,
  type Todo,
} from "../../../store/todoSlice";

export function TodoItem(props: Todo) {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(updateTodo({ id: props.id, text: props.draft }));
    console.log(props.id, " props.id");
  };

  return (
    <div key={props.createdAt} className="post">
      {" "}
      {props.isEdit ? (
        <div className="oneTask">
          <input
            onChange={(event) => {
              let value = event.target.value;

              dispatch(
                editValue({
                  id: props.createdAt,
                  value,
                }),
              );
            }}
            type="text"
            value={props.draft}
            className="valueAdd"
          />
          <div className="saveDel">
            <button className="btnSaveTasks" onClick={handleSave}>
              <img
                className="saveAdd"
                height={30}
                width={30}
                src={saveAdd}
                alt="saveAdd"
              />
            </button>
            <button className="btnNote" onClick={handleSave}>
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
            {props.text}
            {"  "}
          </div>
          <div className="btnEditDel">
            {" "}
            <button
              className="DelletButton"
              onClick={() => {
                dispatch(deleteTodo(props.id));
              }}
            >
              <DeleteForeverIcon />{" "}
            </button>
            <button
              className="btnEdit"
              onClick={() => {
                dispatch(editTodo(props.createdAt));
                console.log(props.createdAt, "props.createdAt");
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
              onChange={() => {
                dispatch(completeTasks(props.createdAt));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
