export function getTodosFromLocalStorage() {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}
