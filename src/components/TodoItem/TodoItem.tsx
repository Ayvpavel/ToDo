// import { IToDo } from "../AddTodo/AddTodo";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import editIcon from "../../assets/edit.svg";
// type Props = {
//   item: IToDo;
//   index: number;
//   setTasks: React.Dispatch<React.SetStateAction<IToDo[]>>;
// };

// export function TodoItem({ item, index, setTasks }: Props) {
//   function toggleDone() {
//     setTasks(prev =>
//       prev.map((t, i) =>
//         i === index ? { ...t, done: !t.done } : t
//       )
//     );
//   }

//   function deleteTask() {
//     setTasks(prev => prev.filter((_, i) => i !== index));
//   }

//   function toggleEdit() {
//     setTasks(prev =>
//       prev.map((t, i) =>
//         i === index ? { ...t, isEdit: !t.isEdit } : t
//       )
//     );
//   }

//   function saveEdit() {
//     setTasks(prev =>
//       prev.map((t, i) =>
//         i === index ? { ...t, value: t.draft, isEdit: false } : t
//       )
//     );
//   }

//   return (
//     <div className="post">
//       {item.isEdit ? (
//         <>
//           <input
//             value={item.draft}
//             onChange={e =>
//               setTasks(prev =>
//                 prev.map((t, i) =>
//                   i === index ? { ...t, draft: e.target.value } : t
//                 )
//               )
//             }
//           />
//           <button onClick={saveEdit}>Save</button>
//           <button onClick={toggleEdit}>X</button>
//         </>
//       ) : (
//         <>
//           <span style={{ textDecoration: item.done ? "line-through" : "" }}>
//             {item.value}
//           </span>

//           <button onClick={deleteTask}>
//             <DeleteForeverIcon />
//           </button>

//           <button onClick={toggleEdit}>
//             <img src={editIcon} width={15} />
//           </button>

//           <input type="checkbox" checked={item.done} onChange={toggleDone} />
//         </>
//       )}
//     </div>
//   );
// }