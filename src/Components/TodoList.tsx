import { NotepadText } from "lucide-react"; // icono Lucide para “sin tareas”
import { AnimatePresence, Reorder } from "framer-motion";
import TodoItem from "./TodoItem";
import type { Todo } from "../Types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onDeleteTodo: (id: number) => void;
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, setTodos }: TodoListProps) {
  const containerHeight = "min-h-[450px] max-h-[450px]";

  // Función para editar el texto de una tarea
  const onEditTodo = (id: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="w-full">
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[450px] text-gray-400 dark:text-gray-500">
          <NotepadText size={60} className="mb-4 animate-bounce text-gray-300 dark:text-gray-600" />
          <p className="text-center text-lg italic">¡Aún no hay tareas!</p>
        </div>
      ) : (
        <Reorder.Group
          axis="y"
          values={todos}
          onReorder={setTodos}
          className={`overflow-y-auto overflow-x-hidden pr-1 w-full ${containerHeight} space-y-2`}
        >
          <AnimatePresence>
            {todos.map((todo) => (
              <Reorder.Item
                key={todo.id}
                value={todo}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.25 }}
              >
                <TodoItem
                  todo={todo}
                  onToggle={() => onToggleTodo(todo.id)}
                  onDelete={() => onDeleteTodo(todo.id)}
                  onEdit={(newText) => onEditTodo(todo.id, newText)}
                />
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}
    </div>
  );
}
