import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortDate(a: Date | string, b: Date | string) {
  return new Date(b).getTime() - new Date(a).getTime()
}