import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return "N/A"; // Handle null/undefined dates

  try {
    const date = new Date(dateString);
    // Example formatting: "25 de Mayo de 2025"
    // You can adjust the locale and options as needed
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (e) {
    console.error("Error formatting date:", e);
    return "Fecha inválida"; // Return a fallback for invalid dates
  }
}
