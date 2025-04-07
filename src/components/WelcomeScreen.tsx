import { useState, useEffect } from 'react';
import logo from '../assets/img/gearlogo.png'

const WelcomeScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Inicia a transição de saída após 2 segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Classes para controlar a animação de fade-out
  const containerClass = `fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-r from-blue-900 to-indigo-800 
    transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <img 
            src={logo} 
            alt="Logo da empresa" 
            className="h-24 animate-pulse"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Bem-vindo ao Sistema de Monitoramento
        </h1>
        <p className="text-xl text-blue-100">
          Carregando dados dos equipamentos...
        </p>
        <p className="text-sm text-blue-200 italic mt-1">
          (Esta tela é meramente decorativa)
        </p>
        
        {/* Indicador de carregamento */}
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-16 border-t-4 border-blue-200 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;