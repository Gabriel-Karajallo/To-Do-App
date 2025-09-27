import { useState, useEffect } from "react"
import TodoForm from "./Components/TodoForm"
import TodoList from "./Components/TodoList"
import type { Todo } from "./Types/todo"
import "./Styles/index.css"
import "./Styles/app.css"
import FilterSegment from "./Components/FilterSegment";


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
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-800 shadow-lg rounded-2xl p-9 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mt-5">
          ¿Qué hay que hacer hoy?
        </h1>

        {/* Formulario */}
        <TodoForm onAddTodo={addTodo} />

        {/* Filtros */}
        <FilterSegment filter={filter} setFilter={setFilter} />

        {/* Lista */}
        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          setTodos={setTodos}
        />
      </div>
      {/* Footer fuera del contenedor principal */}
      <footer className="w-full py-6 text-center text-xs text-gray-400 dark:text-gray-500">
        © 2025 Gabriel Karajallo. Todos los derechos reservados.
      </footer>
    </div>
  )
}
