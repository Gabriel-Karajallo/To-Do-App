// Definimos una interfaz para representar cómo debe lucir un "To-Do" en nuestra app
export interface Todo {
  id: number        // identificador único de la tarea
  text: string      // el texto o descripción de la tarea
  completed: boolean // indica si la tarea está completada (true) o no (false)
}