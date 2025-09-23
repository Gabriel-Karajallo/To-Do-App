import { useState } from "react"

interface TodoFormProps {
  onAddTodo: (text: string) => void
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() === "") return
    onAddTodo(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu tarea..."
        className="flex-1 border border-gray-300 dark:border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-700 dark:text-white"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Añadir
      </button>
    </form>
  )
}
