import { Trash2, Check, GripVertical, Edit } from "lucide-react";
import type { Todo } from "../Types/todo";
import { motion } from "framer-motion";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
  className?: string;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onEdit(editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-700 px-4 py-2 rounded-md shadow-sm cursor-grab select-none">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Handle */}
        <GripVertical size={16} className="text-gray-300 dark:text-gray-500" />

        <label className="relative flex items-center justify-center">
          <motion.input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            whileTap={{ scale: 1.2 }}
            whileHover={{ scale: 1.1 }}
            className="appearance-none h-5 w-5 border border-gray-400 dark:border-gray-600 rounded-md
                       checked:bg-blue-500 checked:border-blue-500
                       transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {todo.completed && (
            <Check
              size={10}
              className="absolute left-0 top-0 m-auto h-5 w-5 text-white pointer-events-none"
            />
          )}
        </label>

        {/* Texto o Input si está editando */}
        {isEditing ? (
  <div className="flex items-center gap-2 flex-1">
    <input
      type="text"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onBlur={handleSave} // guarda al perder foco (móvil)
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") handleCancel();
      }}
      className="flex-1 min-w-0 px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
      autoFocus
    />
    {/* Botón guardar */}
    <button
      onClick={handleSave}
      className="p-1 text-blue-500 hover:text-blue-600"
    >
      <Check size={18} />
    </button>
    {/* Botón cancelar */}
    <button
      onClick={handleCancel}
      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
    >
      ✕
    </button>
  </div>
        ) : (
          <span
            className={`flex-1 min-w-0 text-gray-800 dark:text-gray-100 transition-all duration-300 ${
              todo.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : ""
            } break-words`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Botones de acción */}
      {!isEditing && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1 rounded-md transition-colors"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={onDelete}
            className="flex-shrink-0 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
