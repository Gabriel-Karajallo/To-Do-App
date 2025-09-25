import { AnimatePresence, motion } from "framer-motion"
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
  );
}
