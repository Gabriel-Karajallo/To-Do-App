import { useState } from "react"


interface TodoFormProps {
    onAddTodo: (text: string) => void
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState("") // Estado local para el input

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Evita que la página se recargue al enviar el formulario
    if (text.trim() === "") return // No añadimos tareas vacías
    console.log("Nueva tarea:", text) // Por ahora solo mostramos el texto
    onAddTodo(text) // Llamamos a la función que viene de App.tsx
    setText("") // Limpiamos el input después de enviar
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}            // Conecta el input con el estado local
        onChange={(e) => setText(e.target.value)} // Actualiza el estado al escribir
        placeholder="Escribe tu tarea..."
      />
      <button type="submit">Añadir</button>
    </form>
  )
}
