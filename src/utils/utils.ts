import { clsx, type ClassValue } from "clsx" //Combina classes condicionalmente
import { twMerge } from "tailwind-merge" // Mescla classes do Tailwind CSS

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)) 
}

// Justificativa:
// Melhora a manutenção do código ao simplificar a criação de classes condicionais complexas.