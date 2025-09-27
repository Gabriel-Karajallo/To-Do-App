import { MoreVertical, Trash2, BadgeCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface FilterBarProps {
  filter: "all" | "completed" | "pending";
  setFilter: (f: "all" | "completed" | "pending") => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
  total: number;
  completed: number;
  pending: number;
}

export default function FilterBar({ filter, setFilter, onClearCompleted, onClearAll, total, completed, pending }: FilterBarProps) {
  const segments = [
    { label: "Todas", value: "all", count: total },
    { label: "Completadas", value: "completed", count: completed },
    { label: "Pendientes", value: "pending", count: pending },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Segmentos de filtros */}
      <div className="flex gap-x-2 bg-gray-200 dark:bg-neutral-700 rounded-xl p-1 w-max">
        {segments.map((seg) => (
  <button
    key={seg.value}
    onClick={() => setFilter(seg.value as typeof filter)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
      ${filter === seg.value
        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-600"
      } flex items-center gap-2`}
  >
    <span>{seg.label}</span>
    <span className="text-gray-500 dark:text-gray-400 text-xs">{seg.count}</span>
  </button>
))}
      </div>

      {/* Botón de menú */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
        >
          <MoreVertical size={20} className="text-gray-600 dark:text-gray-300" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 shadow-lg rounded-md overflow-hidden border border-gray-200 dark:border-neutral-700 z-10">
            <button
              onClick={() => {
                onClearCompleted();
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
            >
              <BadgeCheck size={16} /> Eliminar completadas
            </button>
            <button
              onClick={() => {
                onClearAll();
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
            >
              <Trash2 size={16} /> Vaciar todas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
