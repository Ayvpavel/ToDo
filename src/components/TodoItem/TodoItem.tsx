import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import editIkon from "../../assets/edit.svg";

export interface TodoItemProps {
  value: string;
  done: boolean;
  isEdit: boolean;
  draft: string;
  createdAt: number;
  editValue: (index: number, a: string) => void;
  handleAccept: (index: number) => void;
  handleEdit: (index: number) => void;
  deletButton: (deletIndex: number) => void;
  completeTasks: (deletIndex: number) => void;
}

export function TodoItem(props: TodoItemProps) {
  return (
    <div key={props.createdAt} className="post">
      {" "}
      {props.isEdit ? (
        <div>
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
                props.handleAccept(props.createdAt);
                props.handleEdit(props.createdAt);
              }}
            >
              save
            </button>
            <button
              className="btnNote"
              onClick={() => {
                props.handleEdit(props.createdAt);
              }}
            >
              note
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
                props.deletButton(props.createdAt);
              }}
            >
              <DeleteForeverIcon />{" "}
            </button>
            <button
              className="btnEdit"
              onClick={() => {
                props.handleEdit(props.createdAt);
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
