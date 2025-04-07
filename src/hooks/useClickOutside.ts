import { RefObject, useEffect } from 'react';

// Hook personalizado para detectar cliques fora de um elemento específico
// Útil para fechar menus, modais e dropdowns quando o usuário clica em outra área
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent) => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Executa o handler apenas quando o clique ocorre fora do elemento referenciado
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    // Usa mousedown em vez de click para capturar o evento mais cedo no ciclo de interação
    document.addEventListener('mousedown', handleClickOutside);
    
    // Limpeza para evitar memory leaks quando o componente for desmontado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}