import TodoItem from "./TodoItem"
import type { Todo } from "../Types/todo"

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
  return (
    <div>
      <h2>Lista de tareas</h2>
      {todos.length === 0 ? (
        <p>No hay tareas aún</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => onToggleTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
          />
        ))
      )}
    </div>
  )
}
