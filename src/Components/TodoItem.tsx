import { Trash2 } from "lucide-react";
import type { Todo } from "../Types/todo";
import { motion } from "framer-motion";

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
        <motion.input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          whileTap={{ scale: 1.2 }} // pequeño “pop” al hacer click
          whileHover={{ scale: 1.1 }} // ligera ampliación al pasar el mouse
          className="h-5 w-5 cursor-pointer appearance-none rounded-md border 
                     border-gray-400 dark:border-gray-600 
                     checked:bg-white checked:border-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-white"
        />
        <motion.span
          className={`text-gray-800 dark:text-gray-100`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: todo.completed ? 1 : 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        ></motion.span>
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
