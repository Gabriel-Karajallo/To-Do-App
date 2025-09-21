import { useState, useEffect } from "react"
import TodoForm from "./Components/TodoForm"
import TodoList from "./Components/TodoList"
import type { Todo } from "./Types/todo"

export default function App() {
  // #region Declaraciones hook de estado
  const [todos, setTodos] = useState<Todo[]>(() => {
  const savedTodos = localStorage.getItem("todos")
  return savedTodos ? JSON.parse(savedTodos) : []
})
  const [filter, setFilter] = useState<Filter>("all")
  // #endregion

  // #region Añadir una nueva tarea
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),    // Usamos la fecha actual como ID único
      text,
      completed: false
    }
    setTodos([...todos, newTodo]) // Añadimos la nueva tarea al array
  }
  // #endregion

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // #region Estado de filtro
  type Filter = "all" | "completed" | "pending"

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true
    if (filter === "completed") return todo.completed
    if (filter === "pending") return !todo.completed
   return true
  })

  // #endregion

  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])


  return (
    <div>
      <h1>Mi To-Do App 🚀</h1>
      <TodoForm onAddTodo={addTodo} /> {/* Pasamos la función como prop */}
      <div>
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("completed")}>Completadas</button>
        <button onClick={() => setFilter("pending")}>Pendientes</button>
      </div>
      <TodoList
        todos={filteredTodos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
      {/* Pasamos el array de tareas */}
    </div>
  );
}
