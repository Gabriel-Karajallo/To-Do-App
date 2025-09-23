import { useState, useEffect } from "react"
import TodoForm from "./Components/TodoForm"
import TodoList from "./Components/TodoList"
import type { Todo } from "./Types/todo"
import "./Styles/index.css"
import "./Styles/app.css"

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [filter, setFilter] = useState<Filter>("all")

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

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

  type Filter = "all" | "completed" | "pending"

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true
    if (filter === "completed") return todo.completed
    if (filter === "pending") return !todo.completed
    return true
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white dark:bg-neutral-800 shadow-lg rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          To-Do App
        </h1>

        {/* Formulario */}
        <TodoForm onAddTodo={addTodo} />

        {/* Filtros */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-neutral-700 dark:text-gray-300 text-gray-600"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "completed"
                ? "bg-green-500 text-white"
                : "bg-gray-200 dark:bg-neutral-700 dark:text-gray-300 text-gray-600"
            }`}
          >
            Completadas
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 dark:bg-neutral-700 dark:text-gray-300 text-gray-600"
            }`}
          >
            Pendientes
          </button>
        </div>

        {/* Lista */}
        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
