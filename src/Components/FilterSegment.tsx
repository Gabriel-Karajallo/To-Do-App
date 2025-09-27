// import type { Dispatch, SetStateAction } from "react";

// type Filter = "all" | "completed" | "pending";

// interface FilterSegmentProps {
//   filter: Filter;
//   setFilter: Dispatch<SetStateAction<Filter>>;
//   total: number;
//   completed: number;
//   pending: number;
// }

// export default function FilterSegment({
//   filter,
//   setFilter,
//   total,
//   completed,
//   pending,
// }: FilterSegmentProps) {
//   const segments: { label: string; value: Filter; count: number }[] = [
//     { label: "Todas", value: "all", count: total },
//     { label: "Completadas", value: "completed", count: completed },
//     { label: "Pendientes", value: "pending", count: pending },
//   ];

//   return (
//     <div className="flex gap-x-2 bg-gray-200 dark:bg-neutral-700 rounded-xl p-1 w-max mx-auto">
//       {segments.map((seg) => (
//         <button
//           key={seg.value}
//           onClick={() => setFilter(seg.value)}
//           className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
//             ${filter === seg.value
//               ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
//               : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-600"
//             }`}
//         >
//           {seg.label} ({seg.count})
//         </button>
//       ))}
//     </div>
//   );
// }
