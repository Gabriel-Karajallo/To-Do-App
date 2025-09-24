import { Trash2 } from "lucide-react";
import type { Todo } from "../Types/todo";


interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  className?: string;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between bg-gray-50 dark:bg-neutral-700 px-4 py-2 rounded-md shadow-sm transform transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="h-5 w-5 cursor-pointer appearance-none rounded-md border 
             border-gray-400 dark:border-gray-600 
             checked:bg-white checked:border-white
             transition-all duration-300
             focus:outline-none focus:ring-2 focus:ring-white"
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
        className="text-red-500 hover:text-red-700 p-1 rounded-md transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
}
