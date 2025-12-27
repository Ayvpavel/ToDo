import type { IToDo } from "../AddTodo/AddTodo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type TProps = {
  tasks: IToDo[];
  dispach: React.Dispatch<React.SetStateAction<IToDo[]>>;
};

export function TodoList(props: TProps) {
  function deletButton(deletIndex: number) {
    console.log(deletIndex);
    const newTasks = props.tasks.filter((item, index) => {
      if (index === deletIndex) {
        return false;
      } else {
        return true;
      }
    });
    props.dispach(newTasks);
  }

  return (
    <div>
      {props.tasks.map((item, index) => {
        return (
          <div className="post">
            <div className="NewDiv">
              {item.value}{" "}
              <button
                className="DelletButton"
                onClick={() => {
                  deletButton(index);
                }}
              >
                <DeleteForeverIcon />{" "}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
