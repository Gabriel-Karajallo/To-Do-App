import type { Todo } from "../Types/todo"

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.text}
      </span>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  )
}
