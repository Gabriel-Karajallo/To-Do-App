import { AnimatePresence, motion } from "framer-motion";
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
  const containerHeight = "min-h-[450px] max-h-[450px]";
  return (
    <div className="w-full">
      <div
        className={`overflow-y-auto overflow-x-hidden pr-1 w-full ${containerHeight}`}
      >
      {todos.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 italic text-center dark:text-gray-400">
            Aún no hay tareas. ¡Añade una!
          </p>
        </div>
      ) : (
        <div className="min-h-[450px] max-h-[450px] overflow-y-auto overflow-x-hidden pr-1 w-full">
          <ul className="space-y-2">
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.li
                  key={todo.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.2 }}
                >
                  <TodoItem
                    todo={todo}
                    onToggle={() => onToggleTodo(todo.id)}
                    onDelete={() => onDeleteTodo(todo.id)}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}
