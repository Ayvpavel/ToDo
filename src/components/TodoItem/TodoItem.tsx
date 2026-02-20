import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import editIkon from "../../assets/edit.svg";
import saveAdd from "../../assets/saveAdd.png";
import noteAdd from "../../assets/noteAdd.png";
import { useAppDispatch } from "../../../hooks";
import {
  deleteTodo,
  editTodo,
  editValue,
  setTodoCompleted,
  updateTodo,
  type Todo,
} from "../../../store/todoSlice";

export function TodoItem(props: Todo) {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(updateTodo({ id: props.id, text: props.draft ?? props.text }));
  };
  const handleToggle = () => {
    dispatch(setTodoCompleted({ id: props.id }));  
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
              position: "relative",
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: props.completed ? "#f0f0f0" : "#fff",
              color: props.completed ? "#999" : "#000",
              opacity: props.completed ? 0.6 : 1,
              textDecoration: props.completed ? "line-through" : "none",
              transition: "all 0.2s ease",
            }}
            className="NewDiv"
          >
            {props.text}
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
              type="checkbox"
              checked={props.completed} // галочка отражает состояние
              onChange={handleToggle} // меняем completed на сервере
            />
          
          </div>
        </div>
      )}
    </div>
  );
}
