import { Trash2, Check } from "lucide-react";
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
    <motion.li
      layout
      initial={{ opacity: 0, y: -10 }}   // entra desde arriba
      animate={{ opacity: 1, y: 0 }}     // animación al entrar
      exit={{ opacity: 0, x: 50 }}       // animación al salir
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between bg-gray-50 dark:bg-neutral-700 px-4 py-2 rounded-md shadow-sm transform transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center gap-3 relative">
        <motion.input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          whileTap={{ scale: 1.2 }}      // pequeño “pop” al hacer click
          whileHover={{ scale: 1.1 }}    // ligera ampliación al pasar el mouse
          className="appearance-none h-5 w-5 border border-gray-400 dark:border-gray-600 rounded-md
                     checked:bg-blue-500 checked:border-blue-500
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Icono Check de lucide, solo visible si está marcado */}
        {todo.completed && (
          <Check
            size={10}
            className="absolute left-0 top-0.1 m-auto h-5 w-5 text-white pointer-events-none"
          />
        )}

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
        className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </motion.li>
  );
}
