import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function uniqueObjectsById<T extends { id: string }>(arr: T[]) {
  const map = new Map();
  for (const obj of arr) {
    if (!map.has(obj.id)) {
      map.set(obj.id, obj);
    }
  }
  return Array.from(map.values());
}

export { uniqueObjectsById };
