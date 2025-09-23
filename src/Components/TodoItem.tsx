import type { Todo } from "../Types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  className?: string
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between bg-gray-50 dark:bg-neutral-700 px-4 py-2 rounded-md shadow-sm transform transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
        />
        <span
          className={`text-gray-800 dark:text-gray-100 transition-all duration-300 ${
            todo.completed
              ? "line-through text-gray-400 dark:text-gray-500"
              : ""
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 font-medium"
      >
        Eliminar
      </button>
    </li>
  );
}
