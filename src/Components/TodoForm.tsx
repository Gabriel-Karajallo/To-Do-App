import { motion } from "framer-motion"
import { useState } from "react"
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAddTodo: (text: string) => void
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState("")
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() === "") return

    // disparar animación breve
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // dura 0.3s

    onAddTodo(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">
      {/* Input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ej: Hacer la compra..."
        className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 
               focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition-all duration-300 shadow-sm"
      />
      {/* Botón animado con icono */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="rounded-xl bg-blue-200 text-gray-800 px-4 py-2 font-medium shadow-md 
                   hover:bg-blue-300 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-blue-600 flex items-center gap-2 transition-colors duration-300"
      >
        <motion.span
          animate={isClicked ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Plus size={18} />
        </motion.span>
        Añadir
      </motion.button>
    </form>
  )
}
