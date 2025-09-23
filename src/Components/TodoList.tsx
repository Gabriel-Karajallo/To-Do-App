import TodoItem from "./TodoItem";
import type { Todo } from "../Types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  return (
    <div className="space-y-3">
      {todos.length === 0 ? (
        <p className="text-gray-500 italic text-center dark:text-gray-400">
          No hay tareas aún
        </p>
      ) : (
        <div className="max-h-96 overflow-y-auto pr-1">
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => onToggleTodo(todo.id)}
                onDelete={() => onDeleteTodo(todo.id)}
                className="transform transition-all duration-300 ease-in-out"
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
